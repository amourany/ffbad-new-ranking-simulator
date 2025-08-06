import {FEMALE, MALE, PlayerInfo} from '@api/player-ranking/useFetchPlayerRankings';
import dayjs from 'dayjs';

export const malePlayerInfo: PlayerInfo = {
	gender: MALE,
	name: 'John Doe',
	rankingDate: dayjs('2022-01-01').toDate(),
	rankings: {
		doubleRate: 1000,
		doubleSubLevel: 'D7',
		mixedRate: 1000,
		mixedSubLevel: 'D7',
		singleRate: 1000,
		singleSubLevel: 'D7',
	},
};

export const femalePlayerInfo: PlayerInfo = {
	gender: FEMALE,
	name: 'Jane Doe',
	rankingDate: dayjs('2022-01-01').toDate(),
	rankings: {
		doubleRate: 1000,
		doubleSubLevel: 'D7',
		mixedRate: 1000,
		mixedSubLevel: 'D7',
		singleRate: 1000,
		singleSubLevel: 'D7',
	},
};
