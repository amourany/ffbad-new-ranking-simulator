import { skipToken, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '@api/api-constants';

const SEARCH_PLAYER_KEY = 'searchPlayer';

export const useSearchPlayer = (value: string| undefined) => useInfiniteQuery({
	getNextPageParam: (lastPage:SearchPlayerResponse, _allPages, _lastPageParam) => {
		if (lastPage.currentPage >= lastPage.totalPage) {
			return undefined;
		}
		return lastPage.currentPage +1;
	},
	initialPageParam: 1,
	queryFn: value ? ({ pageParam }) => searchPlayer(value!, pageParam):skipToken,
	queryKey: [
		SEARCH_PLAYER_KEY,
		value,
	],
	select: data => data.pages.flatMap(page => page.players),
});

const searchPlayer = async (value: string, pageNumber: number): Promise<SearchPlayerResponse> => {
	const response = await axios.get<SearchPlayerResponse>(`${API_URL}/search-players`, {
		params:{
			pageNumber,
			value,
		} });

	return response.data;
};

type SearchPlayerResponse = {
	totalPage: number;
	currentPage: number;
	players: BFFPlayer[]
};

type BFFPlayer = {
	name: string;
	licence: string;
	club: string;
};
