import {
	ConvertedPlayerRankings,
	convertFemalePlayers,
	convertMalePlayers,
	isN1,
} from '@engine/conversion/convert-rankings';
import { skipToken, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { TTL_24_HOURS } from '@api/api-constants';
import { Disciplines, fetchTopPlayerRankings } from '@api/topPlayerRankings/fetchTopPlayerRankings';

const FETCH_PLAYER_INFO_KEY = 'player-info';

export const useFetchPlayerRankings = (licence: number|undefined) => {

	const queryClient = useQueryClient();
	const fetchTopPlayerRank = fetchTopPlayerRankings(queryClient);

	return useQuery({
		queryFn: licence ? () => fetchPlayerRankings(licence, fetchTopPlayerRank) :skipToken,
		queryKey: [
			FETCH_PLAYER_INFO_KEY,
			licence,
		],
		staleTime: TTL_24_HOURS,
	});
};

const fetchPlayerRankings = async (_licence: number, topPlayerFetcher: (discipline: number) => Promise<number>): Promise<PlayerInfo> => {
    const playerId = {} as PlayerFFBad;
    const response = {} as PlayerRankingsFFBad

    const isCompetitivePlayer = response as unknown !== '';

    const gender = playerId.sex === MALE ? MALE : FEMALE;
    const rankings = await convertToRankings(isCompetitivePlayer ? response : nonCompetitivePlayer, gender, topPlayerFetcher);
	const convertedRankings = gender === MALE ? convertMalePlayers(rankings) : convertFemalePlayers(rankings);

	return {
		convertedRankings,
		gender,
		name: `${playerId.firstName} ${playerId.lastName}`,
		rankingDate: dayjs(response.rankingDate).toDate(),
		rankings,
	};
};

const convertToRankings = async (data: PlayerRankingsFFBad, gender: Gender, topPlayerFetcher: (discipline: number) => Promise<number>): Promise<PlayerRankings> => {
	const isMale = gender === MALE;
	const doubleUpRate = isN1(data.doubleSubLevel, data.doubleUpRate) ? await topPlayerFetcher(isMale ? Disciplines.MEN_DOUBLES : Disciplines.WOMEN_DOUBLES) : data.doubleUpRate!;
	const singleUpRate = isN1(data.simpleSubLevel, data.simpleUpRate) ? await topPlayerFetcher(isMale ? Disciplines.MEN_SINGLES : Disciplines.WOMEN_SINGLES) : data.simpleUpRate!;
	const mixedUpRate = isN1(data.mixteSubLevel, data.mixteUpRate) ? await topPlayerFetcher(isMale ? Disciplines.MEN_MIXED : Disciplines.WOMEN_MIXED) : data.mixteUpRate!;

	return ({
		doubleDownRate: data.doubleDownRate,
		doubleRate: data.doubleRate,
		doubleSubLevel: data.doubleSubLevel,
		doubleUpRate: doubleUpRate,
		mixedDownRate: data.mixteDownRate,
		mixedRate: data.mixteRate,
		mixedSubLevel: data.mixteSubLevel,
		mixedUpRate: mixedUpRate,
		singleDownRate: data.simpleDownRate,
		singleRate: data.simpleRate,
		singleSubLevel: data.simpleSubLevel,
		singleUpRate: singleUpRate,
	});
};

type PlayerFFBad = {
	personId: number;
	sex: string;
	firstName: string;
	lastName: string;
};

type PlayerRankingsFFBad = {
	rankingDate: string;
	simpleRate: number;
	simpleSubLevel: string;
	simpleDownRate: number;
	simpleUpRate?: number;
	doubleRate: number;
	doubleSubLevel: string;
	doubleDownRate: number;
	doubleUpRate?: number;
	mixteRate: number;
	mixteSubLevel: string;
	mixteDownRate: number;
	mixteUpRate?: number;
};

export type PlayerInfo = {
	gender: Gender;
	name: string;
	rankingDate: Date;
	rankings: PlayerRankings;
	convertedRankings: ConvertedPlayerRankings;
};

export type PlayerRankings = {
	singleRate: number;
	singleSubLevel: string;
	singleDownRate: number;
	singleUpRate: number;
	doubleRate: number;
	doubleSubLevel: string;
	doubleDownRate: number;
	doubleUpRate: number;
	mixedRate: number;
	mixedSubLevel: string;
	mixedDownRate: number;
	mixedUpRate: number;
};

export const MALE = 'HOMME';
export const FEMALE = 'FEMME';
export type Gender = typeof MALE | typeof FEMALE;

const nonCompetitivePlayer: PlayerRankingsFFBad = {
	doubleDownRate: 0,
	doubleRate: 0,
	doubleSubLevel: 'NC',
	doubleUpRate: 0.1,
	mixteDownRate: 0,
	mixteRate: 0,
	mixteSubLevel: 'NC',
	mixteUpRate: 0.1,
	rankingDate: '',
	simpleDownRate: 0,
	simpleRate: 0,
	simpleSubLevel: 'NC',
	simpleUpRate: 0.1,
};
