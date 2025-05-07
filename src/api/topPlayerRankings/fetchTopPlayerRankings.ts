import { QueryClient } from '@tanstack/react-query';
import { API_URL, TTL_24_HOURS, headers } from '@api/api-constants';
import axios from 'axios';
import dayjs from 'dayjs';

const TOP_PLAYER_QUERY_KEY = 'topPlayerRankings';

export enum Disciplines {
	MEN_SINGLES = 1,
	WOMEN_SINGLES,
	MEN_DOUBLES,
	WOMEN_DOUBLES,
	MEN_MIXED,
	WOMEN_MIXED,
}

export const fetchTopPlayerRankings = (queryClient: QueryClient) =>async (discipline: number) => await queryClient.fetchQuery({
	queryFn: () => fetchTopPlayer(discipline),
	queryKey: [
		TOP_PLAYER_QUERY_KEY,
		discipline,
	],
	staleTime: TTL_24_HOURS,
});

const fetchTopPlayer = async (discipline: number) => {
	const response = await axios.post<TopPlayer[]>(`${API_URL}/search/tops`, {
		dateFrom: dayjs(),
		discipline,
		sort: 'nom-ASC',
		top: 1,
	},{ headers });

	return response.data[0].rate;
};

type TopPlayer = {
	rate: number
};
