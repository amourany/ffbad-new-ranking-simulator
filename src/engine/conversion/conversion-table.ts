export type ConversionTable = {
	[key: string]: Rank;
};

export type Rank = {
	singlesWomen: number;
	singlesMen: number;
	doublesWomen: number;
	doublesMen: number;
	mixedDoublesWomen: number;
	mixedDoublesMen: number;
};

export const rankLabelsOrder: string[] = [
	'Max',
	'N1',
	'N2',
	'N3',
	'R4',
	'R5',
	'R6',
	'D7',
	'D8',
	'D9',
	'P10',
	'P11',
	'P12',
];

export const MAX_RANKING = 2400;
export const WOMEN_MIXED_MAX_RANKING = 2800;
export const MEN_MIXED_MAX_RANKING = 2400;
export const MIN_RANKING = 400;
export const MIN_RANKING_DELTA = 500;

export const conversionTable: ConversionTable = {
	'D7': {
		doublesMen: 1400,
		doublesWomen: 1050,
		mixedDoublesMen: 1400,
		mixedDoublesWomen: 1400,
		singlesMen: 1400,
		singlesWomen: 1050,
	},
	'D8': {
		doublesMen: 1200,
		doublesWomen: 900,
		mixedDoublesMen: 1200,
		mixedDoublesWomen: 1200,
		singlesMen: 1200,
		singlesWomen: 900,
	},
	'D9': {
		doublesMen: 1000,
		doublesWomen: 750,
		mixedDoublesMen: 1000,
		mixedDoublesWomen: 1000,
		singlesMen: 1000,
		singlesWomen: 750,
	},
	'Max': {
		doublesMen: 2800,
		doublesWomen: 2400,
		mixedDoublesMen: 2800,
		mixedDoublesWomen: 2800,
		singlesMen: 2800,
		singlesWomen: 2400,
	},
	'N1': {
		doublesMen: 2600,
		doublesWomen: 2200,
		mixedDoublesMen: 2600,
		mixedDoublesWomen: 2600,
		singlesMen: 2600,
		singlesWomen: 2200,
	},
	'N2': {
		doublesMen: 2400,
		doublesWomen: 2000,
		mixedDoublesMen: 2400,
		mixedDoublesWomen: 2400,
		singlesMen: 2400,
		singlesWomen: 2000,
	},
	'N3': {
		doublesMen: 2200,
		doublesWomen: 1800,
		mixedDoublesMen: 2200,
		mixedDoublesWomen: 2200,
		singlesMen: 2200,
		singlesWomen: 1800,
	},
	'P10': {
		doublesMen: 800,
		doublesWomen: 600,
		mixedDoublesMen: 800,
		mixedDoublesWomen: 800,
		singlesMen: 800,
		singlesWomen: 600,
	},
	'P11': {
		doublesMen: 600,
		doublesWomen: 500,
		mixedDoublesMen: 600,
		mixedDoublesWomen: 600,
		singlesMen: 600,
		singlesWomen: 500,
	},
	'P12': {
		doublesMen: 400,
		doublesWomen: 400,
		mixedDoublesMen: 500,
		mixedDoublesWomen: 500,
		singlesMen: 400,
		singlesWomen: 400,
	},
	'R4': {
		doublesMen: 2000,
		doublesWomen: 1600,
		mixedDoublesMen: 2000,
		mixedDoublesWomen: 2000,
		singlesMen: 2000,
		singlesWomen: 1600,
	},
	'R5': {
		doublesMen: 1800,
		doublesWomen: 1400,
		mixedDoublesMen: 1800,
		mixedDoublesWomen: 1800,
		singlesMen: 1800,
		singlesWomen: 1400,
	},
	'R6': {
		doublesMen: 1600,
		doublesWomen: 1200,
		mixedDoublesMen: 1600,
		mixedDoublesWomen: 1600,
		singlesMen: 1600,
		singlesWomen: 1200,
	},
};
