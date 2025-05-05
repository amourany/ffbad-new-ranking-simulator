import { ConvertedPlayerRankings, convertFemalePlayers, convertMalePlayers } from '@engine/conversion/convert-rankings';
import { useQueries } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { API_URL, TTL_24_HOURS, headers } from '@api/api-constants';

const FETCH_PLAYER_INFO_KEY = 'player-info';

export const useFetchPlayersRankings = (licences: PlayerLicences) => {

	const queries = useQueries({
		queries: Object.entries(licences).map(([
			_,
			value,
		]) => ({
			enabled: !!value,
			queryFn: () => fetchPlayerRanking(value),
			queryKey: [
				FETCH_PLAYER_INFO_KEY,
				value,
			],
			staleTime: TTL_24_HOURS,
		})),
	});

	return Object.entries(licences).map(([
		key,
	], index) => [
		key,
		queries[index],
	]);
};

const fetchPlayerRanking = async (licence: number): Promise<PlayerInfo> => {
	const playerId = await axios.get<PlayerFFBad>(`${API_URL}/person/${licence}/informationsLicence/undefined`, {
		headers,
	});
	const response = await axios.get<PlayerRankingsFFBad>(`${API_URL}/person/${playerId.data.personId}/rankings`,{
		headers,
	});

	const isCompetitivePlayer = response.data as unknown !== '';

	const gender = playerId.data.sex === MALE ? MALE : FEMALE;
	const rankings = convertToRankings(isCompetitivePlayer ? response.data : nonCompetitivePlayer);
	const convertedRankings = gender === MALE ? convertMalePlayers(rankings) : convertFemalePlayers(rankings);

	return {
		convertedRankings,
		gender,
		name: `${playerId.data.firstName} ${playerId.data.lastName}`,
		rankingDate: dayjs(response.data.rankingDate).toDate(),
		rankings,
	};
};

const convertToRankings = (data: PlayerRankingsFFBad): PlayerRankings => ({
	doubleDownRate: data.doubleDownRate,
	doubleRate: data.doubleRate,
	doubleSubLevel: data.doubleSubLevel,
	doubleUpRate: data.doubleUpRate ?? data.doubleRate,
	mixedDownRate: data.mixteDownRate,
	mixedRate: data.mixteRate,
	mixedSubLevel: data.mixteSubLevel,
	mixedUpRate: data.mixteUpRate ?? data.mixteRate,
	singleDownRate: data.simpleDownRate,
	singleRate: data.simpleRate,
	singleSubLevel: data.simpleSubLevel,
	singleUpRate: data.simpleUpRate ?? data.simpleRate,
});

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
	simpleUpRate: number;
	doubleRate: number;
	doubleSubLevel: string;
	doubleDownRate: number;
	doubleUpRate: number;
	mixteRate: number;
	mixteSubLevel: string;
	mixteDownRate: number;
	mixteUpRate: number;
};

export type PlayerLicences = {
	playerA?: number;
	playerB?: number;
	playerC?: number;
	playerD?: number;
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
