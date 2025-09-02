import { skipToken, useInfiniteQuery } from '@tanstack/react-query';
import { API_URL, TTL_1_HOUR } from '@api/api-constants';
import axios from 'axios';
import { getRangeThursdayToThursday } from '@utils/dateRange';
import dayjs from 'dayjs';

export const useFetchLastWeekTournaments = (licence: string|undefined, club: string|undefined) => useInfiniteQuery({
	getNextPageParam: (lastPage: BFFTournamentPageResponse, _allPages, lastPageParam) => {
		if (lastPage.currentPage >= lastPage.totalPage) {
			return undefined;
		}
		return lastPageParam + 1;
	},
	initialPageParam: 0,
	queryFn: (licence && club) ?
		({ pageParam }) => fetchLastWeekTournaments(pageParam, licence, club)
		: skipToken,
	queryKey: [
		'FETCH_LAST_WEEK_TOURNAMENTS',
		club,
	],
	select: data => data.pages.flatMap(page => page.tournaments),
	staleTime: TTL_1_HOUR,
});

const fetchLastWeekTournaments = async (pageNumber: number, licence: string, club: string): Promise<BFFTournamentPageResponse> => {
	const { from, to } = getRangeThursdayToThursday(dayjs().toDate());

	const response = await axios.get<BFFTournamentPageResponse>(`${API_URL}/tournaments/search`, {
		params: {
			club,
			dateFrom: dayjs(from).format('YYYY-MM-DD'),
			dateTo: dayjs(to).format('YYYY-MM-DD'),
			licence,
			pageNumber: pageNumber,
		},
	});

	return response.data;
};

type BFFTournamentPageResponse = {
	totalPage: number,
	currentPage: number,
	tournaments: BFFTournamentResponse[]
};

type BFFTournamentResponse = {
	tournament: BFFTournament,
	players: BFFPlayer[],
	medals: BFFMedals
};

type BFFTournament = {
	id: string;
	name: string;
	city: string;
	firstDay: number;
	lastDay: number;
};

type BFFPlayer = {
	name: string;
	licence: string;
	club: string;
};

export type BFFMedals = {
	gold: BFFMedal[],
	silver: BFFMedal[],
	bronze: BFFMedal[],
};

export type BFFMedal = {
	playerA: BFFPlayer;
	playerB?: BFFPlayer;
	seriesName: string;
	seriesId: string;
};
