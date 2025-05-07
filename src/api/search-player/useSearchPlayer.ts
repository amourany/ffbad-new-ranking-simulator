import { skipToken, useInfiniteQuery } from '@tanstack/react-query';

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
	select: data => data.pages.flatMap(page => page.persons),
});

const searchPlayer = async (_value: string, _pageNumber: number): Promise<SearchPlayerResponse> => {
	return {totalPage: 0, currentPage: 0, persons: []};
};

type SearchPlayerResponse = {
	totalPage: number;
	currentPage: number;
	persons: PersonFFBad[]
};

type PersonFFBad = {
	personId: number;
	name: string;
	licence: string;
	club: ClubFFBad;
};

type ClubFFBad = {
	acronym: string;
};
