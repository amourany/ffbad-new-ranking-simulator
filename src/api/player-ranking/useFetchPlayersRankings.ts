import { convertFemalePlayers, convertMalePlayers } from '@hooks/useConvertRankings';
import { useQueries } from '@tanstack/react-query';
import axios, { RawAxiosRequestHeaders } from 'axios';
import dayjs from 'dayjs';

const headers: RawAxiosRequestHeaders = {
	'Caller-URL': '/api/person/',
	'Verify-Token': '695c4c35850a31b9734f2b334a99f4bf8f351f5e2af4f8c9a09e47d20af762f3.1745914561762',
};

export const TTL_24_HOURS = 24 * 60 * 60 * 1000;
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
	const playerId = await axios.get<PlayerFFBad>(`https://myffbad.fr/api/person/${licence}/informationsLicence/undefined`, {
		headers,
	});
	const response = await axios.get<PlayerRankingsFFBad>(`https://myffbad.fr/api/person/${playerId.data.personId}/rankings`,{
		headers,
	});

	const gender = playerId.data.sex === MALE ? MALE : FEMALE;
	const { convertDouble, convertMixed, convertSingle } = gender === MALE ? convertMalePlayers() : convertFemalePlayers();
	const rankings = convertToRankings(response.data);

	return {
		convertedRankings: {
			doubleRate: convertDouble(rankings),
			mixedRate: convertMixed(rankings),
			singleRate: convertSingle(rankings),
		},
		gender,
		name: `${playerId.data.firstName} ${playerId.data.lastName}`,
		rankingDate: dayjs(response.data.rankingDate).toDate(),
		rankings,
	};
};

const convertToRankings = (data: PlayerRankingsFFBad): PlayerRankings => ({
	...data,
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
	me?: number;
	opponent?: number;
};

export type PlayersInfo = {
	me?: PlayerInfo;
	opponent?: PlayerInfo;
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

export type ConvertedPlayerRankings = {
	singleRate: number;
	doubleRate: number;
	mixedRate: number;
};

export const MALE = 'HOMME';
export const FEMALE = 'FEMME';
export type Gender = typeof MALE | typeof FEMALE;
