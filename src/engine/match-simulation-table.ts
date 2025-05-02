type MatchSimulationTable = {
	[key: number]: WinLosePoints;
};

type WinLosePoints = {
	higherRankedPlayerWinsPointsForWinner: number;
	higherRankedPlayerWinsPointsForLoser: number;
	lowerRankedPlayerWinsPointsForWinner: number;
	lowerRankedPlayerWinsPointsForLoser: number;
};

export const matchSimulationTable: MatchSimulationTable = {
	0: {
		higherRankedPlayerWinsPointsForLoser: -14,
		higherRankedPlayerWinsPointsForWinner: 20,
		lowerRankedPlayerWinsPointsForLoser: -14,
		lowerRankedPlayerWinsPointsForWinner: 20,
	},
	100: {
		higherRankedPlayerWinsPointsForLoser: -12,
		higherRankedPlayerWinsPointsForWinner: 14,
		lowerRankedPlayerWinsPointsForLoser: -16,
		lowerRankedPlayerWinsPointsForWinner: 26,
	},
	1000: {
		higherRankedPlayerWinsPointsForLoser: 0,
		higherRankedPlayerWinsPointsForWinner: 3,
		lowerRankedPlayerWinsPointsForLoser: -28,
		lowerRankedPlayerWinsPointsForWinner: 70,
	},
	200: {
		higherRankedPlayerWinsPointsForLoser: -10,
		higherRankedPlayerWinsPointsForWinner: 11,
		lowerRankedPlayerWinsPointsForLoser: -18,
		lowerRankedPlayerWinsPointsForWinner: 32,
	},
	300: {
		higherRankedPlayerWinsPointsForLoser: -7,
		higherRankedPlayerWinsPointsForWinner: 9,
		lowerRankedPlayerWinsPointsForLoser: -20,
		lowerRankedPlayerWinsPointsForWinner: 38,
	},
	400: {
		higherRankedPlayerWinsPointsForLoser: -4,
		higherRankedPlayerWinsPointsForWinner: 7,
		lowerRankedPlayerWinsPointsForLoser: -22,
		lowerRankedPlayerWinsPointsForWinner: 43,
	},
	50: {
		higherRankedPlayerWinsPointsForLoser: -13,
		higherRankedPlayerWinsPointsForWinner: 17,
		lowerRankedPlayerWinsPointsForLoser: -15,
		lowerRankedPlayerWinsPointsForWinner: 23,
	},
	600: {
		higherRankedPlayerWinsPointsForLoser: -1,
		higherRankedPlayerWinsPointsForWinner: 5,
		lowerRankedPlayerWinsPointsForLoser: -24,
		lowerRankedPlayerWinsPointsForWinner: 53,
	},
	800: {
		higherRankedPlayerWinsPointsForLoser: 0,
		higherRankedPlayerWinsPointsForWinner: 4,
		lowerRankedPlayerWinsPointsForLoser: -26,
		lowerRankedPlayerWinsPointsForWinner: 61,
	},
};
