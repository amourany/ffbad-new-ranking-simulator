import { FEMALE, MALE, PlayerInfo } from '@api/player-ranking/useFetchPlayerRankings';
import dayjs from 'dayjs';

export const malePlayerInfo: PlayerInfo = {
	convertedRankings: {
		doubleRate: 1000,
		mixedRate: 1000,
		singleRate: 1000,
	},
	gender: MALE,
	name: 'John Doe',
	rankingDate: dayjs('2022-01-01').toDate(),
	rankings: {
		doubleRate: 100,
		doubleSubLevel: 'D7',
		mixedRate: 100,
		mixedSubLevel: 'D7',
		singleRate: 100,
		singleSubLevel: 'D7',
	},
};

export const femalePlayerInfo: PlayerInfo = {
	convertedRankings: {
		doubleRate: 1000,
		mixedRate: 1000,
		singleRate: 1000,
	},
	gender: FEMALE,
	name: 'Jane Doe',
	rankingDate: dayjs('2022-01-01').toDate(),
	rankings: {
		doubleRate: 100,
		doubleSubLevel: 'D7',
		mixedRate: 100,
		mixedSubLevel: 'D7',
		singleRate: 100,
		singleSubLevel: 'D7',
	},
};
