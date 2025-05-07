import { QueryClient } from '@tanstack/react-query';
import { TTL_24_HOURS } from '@api/api-constants';

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

const fetchTopPlayer = async (_discipline: number) => {
	return {} as TopPlayer;
};

type TopPlayer = {
	rate: number
};
