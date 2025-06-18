import { ConvertedPlayerRankings, convertFemalePlayers, convertMalePlayers } from '@engine/conversion/convert-rankings';
import { skipToken, useQuery } from '@tanstack/react-query';
import { API_URL, TTL_24_HOURS } from '@api/api-constants';
import axios from 'axios';
import { Thresholds, useRankingThresholds } from '@api/ranking-threshold/useRankingThresholds';
import dayjs from 'dayjs';

const FETCH_PLAYER_INFO_KEY = 'player-info';

export const useFetchPlayerRankings = (licence: number|undefined) => {

	const { data, isSuccess } = useRankingThresholds();

	return useQuery({
		queryFn: (licence && isSuccess) ? () => fetchPlayerRankings(licence, data) :skipToken,
		queryKey: [
			FETCH_PLAYER_INFO_KEY,
			licence,
		],
		staleTime: TTL_24_HOURS,
	});
};

const fetchPlayerRankings = async (licence: number, rankingThreshold: Thresholds): Promise<PlayerInfo> => {

	const playerInfo = await axios.get<BFFPlayerInfo>(`${API_URL}/player/${licence}`);

	const gender = playerInfo.data.gender;
	const convertedRankings = gender === MALE ? convertMalePlayers(playerInfo.data.rankings, rankingThreshold) : convertFemalePlayers(playerInfo.data.rankings, rankingThreshold);

	return {
		...playerInfo.data,
		convertedRankings,
		rankingDate: dayjs(playerInfo.data.rankingDate).toDate(),
	};
};

export type PlayerInfo = {
	gender: Gender;
	name: string;
	rankingDate: Date;
	rankings: PlayerRankings;
	convertedRankings: ConvertedPlayerRankings;
};

export type BFFPlayerInfo = {
	gender: Gender;
	name: string;
	rankingDate: Date;
	rankings: PlayerRankings;
};

export type PlayerRankings = {
	singleRate: number;
	singleSubLevel: string;
	doubleRate: number;
	doubleSubLevel: string;
	mixedRate: number;
	mixedSubLevel: string;
};

export const MALE = 'HOMME';
export const FEMALE = 'FEMME';
export type Gender = typeof MALE | typeof FEMALE;
