import { useQuery } from '@tanstack/react-query';
import { API_URL, TTL_24_HOURS } from '@api/api-constants';
import axios from 'axios';

const FETCH_RANKING_THRESHOLDS_KEY = 'ranking-thresholds';

export const useRankingThresholds = () => useQuery({
	queryFn: fetchRankingThresholds,
	queryKey: [
		FETCH_RANKING_THRESHOLDS_KEY,
	],
	staleTime: TTL_24_HOURS,
});

const fetchRankingThresholds = async () => {
	const rankingThresholds = await axios.get<Thresholds>(`${API_URL}/ranking-thresholds`);
	const ip = await axios.get<string>(`${API_URL}/ip`);
	console.log({ip: ip.data});

	return rankingThresholds.data;
};

export type Thresholds = {
	[key:string]: RanksByGender
};

export type RanksByGender = {
	men: Rank;
	women: Rank;
};

export type Rank = {
	singlesUpperBound: number;
	singlesLowerBound: number;
	doublesUpperBound: number;
	doublesLowerBound: number;
	mixedDoublesUpperBound: number;
	mixedDoublesLowerBound: number;
};