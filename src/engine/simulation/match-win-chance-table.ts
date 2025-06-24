/* eslint-disable */
export type MatchWinChanceTable = {
	[key: number]: WinLoseChance;
};

type WinLoseChance = {
	higherRankedPlayerWinProbability: number;
	lowerRankedPlayerWinProbability: number;
};

export const matchWinChancesTable: MatchWinChanceTable = {
	0: {
		higherRankedPlayerWinProbability: 50,
		lowerRankedPlayerWinProbability: 50,
	},
	50: {
		higherRankedPlayerWinProbability: 55,
		lowerRankedPlayerWinProbability: 45,
	},
	100: {
		higherRankedPlayerWinProbability: 61,
		lowerRankedPlayerWinProbability: 39,
	},
	200: {
		higherRankedPlayerWinProbability: 70,
		lowerRankedPlayerWinProbability: 30,
	},
	300: {
		higherRankedPlayerWinProbability: 78,
		lowerRankedPlayerWinProbability: 22,
	},
	400: {
		higherRankedPlayerWinProbability: 85,
		lowerRankedPlayerWinProbability: 15,
	},
	600: {
		higherRankedPlayerWinProbability: 93,
		lowerRankedPlayerWinProbability: 7,
	},
	800: {
		higherRankedPlayerWinProbability: 97,
		lowerRankedPlayerWinProbability: 3,
	},
	1000: {
		higherRankedPlayerWinProbability: 99,
		lowerRankedPlayerWinProbability: 1,
	},
};

/* eslint-enable */
