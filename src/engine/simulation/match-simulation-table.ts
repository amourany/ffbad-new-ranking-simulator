/* eslint-disable */
export type MatchSimulationTable = {
	[key: number]: WinLosePoints;
};

type WinLosePoints = {
	higherRankedPlayerWinsPointsForWinner: number;
	higherRankedPlayerWinsPointsForLoser: number;
	lowerRankedPlayerWinsPointsForWinner: number;
	lowerRankedPlayerWinsPointsForLoser: number;
};

export const matchSimulationTableForSingles: MatchSimulationTable = {
	0: {
		higherRankedPlayerWinsPointsForWinner: 20,
		higherRankedPlayerWinsPointsForLoser: -14,
		lowerRankedPlayerWinsPointsForWinner: 20,
		lowerRankedPlayerWinsPointsForLoser: -14,
	},
	50: {
		higherRankedPlayerWinsPointsForWinner: 17,
		higherRankedPlayerWinsPointsForLoser: -13,
		lowerRankedPlayerWinsPointsForWinner: 23,
		lowerRankedPlayerWinsPointsForLoser: -15,
	},
	100: {
		higherRankedPlayerWinsPointsForWinner: 14,
		higherRankedPlayerWinsPointsForLoser: -12,
		lowerRankedPlayerWinsPointsForWinner: 26,
		lowerRankedPlayerWinsPointsForLoser: -16,
	},
	200: {
		higherRankedPlayerWinsPointsForWinner: 11,
		higherRankedPlayerWinsPointsForLoser: -10,
		lowerRankedPlayerWinsPointsForWinner: 32,
		lowerRankedPlayerWinsPointsForLoser: -18,
	},
	300: {
		higherRankedPlayerWinsPointsForWinner: 9,
		higherRankedPlayerWinsPointsForLoser: -7,
		lowerRankedPlayerWinsPointsForWinner: 38,
		lowerRankedPlayerWinsPointsForLoser: -20,
	},
	400: {
		higherRankedPlayerWinsPointsForWinner: 7,
		higherRankedPlayerWinsPointsForLoser: -4,
		lowerRankedPlayerWinsPointsForWinner: 43,
		lowerRankedPlayerWinsPointsForLoser: -22,
	},
	600: {
		higherRankedPlayerWinsPointsForWinner: 5,
		higherRankedPlayerWinsPointsForLoser: -1,
		lowerRankedPlayerWinsPointsForWinner: 53,
		lowerRankedPlayerWinsPointsForLoser: -24,
	},
	800: {
		higherRankedPlayerWinsPointsForWinner: 4,
		higherRankedPlayerWinsPointsForLoser: 0,
		lowerRankedPlayerWinsPointsForWinner: 61,
		lowerRankedPlayerWinsPointsForLoser: -26,
	},
	1000: {
		higherRankedPlayerWinsPointsForWinner: 3,
		higherRankedPlayerWinsPointsForLoser: 0,
		lowerRankedPlayerWinsPointsForWinner: 70,
		lowerRankedPlayerWinsPointsForLoser: -28,
	},
};

export const matchSimulationTableForDoubles: MatchSimulationTable = {
	0: {
		higherRankedPlayerWinsPointsForWinner: 40,
		higherRankedPlayerWinsPointsForLoser: -28,
		lowerRankedPlayerWinsPointsForWinner: 40,
		lowerRankedPlayerWinsPointsForLoser: -28,
	},
	50: {
		higherRankedPlayerWinsPointsForWinner: 34,
		higherRankedPlayerWinsPointsForLoser: -26,
		lowerRankedPlayerWinsPointsForWinner: 46,
		lowerRankedPlayerWinsPointsForLoser: -30,
	},
	100: {
		higherRankedPlayerWinsPointsForWinner: 28,
		higherRankedPlayerWinsPointsForLoser: -24,
		lowerRankedPlayerWinsPointsForWinner: 52,
		lowerRankedPlayerWinsPointsForLoser: -32,
	},
	200: {
		higherRankedPlayerWinsPointsForWinner: 22,
		higherRankedPlayerWinsPointsForLoser: -20,
		lowerRankedPlayerWinsPointsForWinner: 64,
		lowerRankedPlayerWinsPointsForLoser: -36,
	},
	300: {
		higherRankedPlayerWinsPointsForWinner: 18,
		higherRankedPlayerWinsPointsForLoser: -14,
		lowerRankedPlayerWinsPointsForWinner: 76,
		lowerRankedPlayerWinsPointsForLoser: -40,
	},
	400: {
		higherRankedPlayerWinsPointsForWinner: 14,
		higherRankedPlayerWinsPointsForLoser: -8,
		lowerRankedPlayerWinsPointsForWinner: 86,
		lowerRankedPlayerWinsPointsForLoser: -44,
	},
	600: {
		higherRankedPlayerWinsPointsForWinner: 10,
		higherRankedPlayerWinsPointsForLoser: -2,
		lowerRankedPlayerWinsPointsForWinner: 106,
		lowerRankedPlayerWinsPointsForLoser: -48,
	},
	800: {
		higherRankedPlayerWinsPointsForWinner: 8,
		higherRankedPlayerWinsPointsForLoser: 0,
		lowerRankedPlayerWinsPointsForWinner: 122,
		lowerRankedPlayerWinsPointsForLoser: -52,
	},
	1000: {
		higherRankedPlayerWinsPointsForWinner: 6,
		higherRankedPlayerWinsPointsForLoser: 0,
		lowerRankedPlayerWinsPointsForWinner: 140,
		lowerRankedPlayerWinsPointsForLoser: -56,
	},
};

/* eslint-enable */
