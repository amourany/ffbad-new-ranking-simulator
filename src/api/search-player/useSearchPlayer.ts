import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL, headers } from '@api/api-constants';

const SEARCH_PLAYER_KEY = 'searchPlayer';

export const useSearchPlayer = (value: string| undefined) => useInfiniteQuery({
	enabled: !!value,
	getNextPageParam: (lastPage:SearchPlayerResponse, _allPages, _lastPageParam) => {
		if (lastPage.currentPage === lastPage.totalPage) {
			return undefined;
		}
		return lastPage.currentPage +1;
	},
	initialPageParam: 1,
	queryFn: ({ pageParam }) => searchPlayer(value!, pageParam),
	queryKey: [
		SEARCH_PLAYER_KEY,
		value,
	],
	select: data => data.pages.flatMap(page => page.persons),
});

const searchPlayer = async (value: string, pageNumber: number): Promise<SearchPlayerResponse> => {
	const response = await axios.post<SearchPlayerResponse>(`${API_URL}/search`, {
		isLicenced: 1,
		page: pageNumber,
		sort: 'nom-ASC',
		text: value,
		type: 'PERSON',
	},
	{ headers });

	return response.data;
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
