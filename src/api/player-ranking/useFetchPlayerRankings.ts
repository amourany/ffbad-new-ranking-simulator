import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { RawAxiosRequestHeaders } from 'axios';
import dayjs from 'dayjs';

const headers: RawAxiosRequestHeaders = {
	'Caller-URL': '/api/person/',
	'Verify-Token': '695c4c35850a31b9734f2b334a99f4bf8f351f5e2af4f8c9a09e47d20af762f3.1745914561762',
};

export const TTL_24_HOURS = 24 * 60 * 60 * 1000;

export const useFetchPlayerRankings = (licence: string|undefined):UseQueryResult<PlayerInfo> => {
	const { data: playerFFBad } = useQuery({
		enabled: !!licence,
		queryFn: () => fetchPlayerFFBadId(licence!!),
		queryKey: [
			'player-ffBad-id',
			licence,
		],
		staleTime: TTL_24_HOURS,
	});

	return useQuery({
		enabled: !!playerFFBad?.personId,
		queryFn: () => fetchPlayerRanking(playerFFBad?.personId!!),
		queryKey: [
			'player-ranking',
			playerFFBad?.personId,
		],
		select: (data) =>
			({
				firstName: playerFFBad!.firstName,
				gender: playerFFBad!.sex === MALE ? MALE : FEMALE,
				lastName: playerFFBad!.lastName,
				rankingDate: dayjs(data.rankingDate).toDate(),
				rankings: {
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
				},
			}),
		staleTime: TTL_24_HOURS,
	});
};

const fetchPlayerFFBadId = async (licence: string) => {
	const response = await axios.get<PlayerFFBad>(`https://myffbad.fr/api/person/${licence}/informationsLicence/undefined`, {
		headers,
	});
	return response.data;
};

const fetchPlayerRanking = async (personId: number) => {
	const response = await axios.get<PlayerRankingsFFBad>(`https://myffbad.fr/api/person/${personId}/rankings`,{
		headers,
	},
	);
	return response.data;
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

export type PlayerInfo = {
	gender: Gender;
	firstName: string;
	lastName: string;
	rankingDate: Date;
	rankings: PlayerRankings;
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
