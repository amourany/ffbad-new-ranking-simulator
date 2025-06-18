import { FEMALE, MALE, PlayerRankings } from '@api/player-ranking/useFetchPlayerRankings';
import { conversionTable, rankLabelsOrder } from '@engine/conversion/conversion-table';
import { adjustNewRankings, calculateNewRanking } from '@engine/conversion/migrate-ranking';
import { Thresholds } from '@api/ranking-threshold/useRankingThresholds';

export type ConvertedPlayerRankings = {
	singleRate: number;
	doubleRate: number;
	mixedRate: number;
};

export const convertMalePlayers = (rankings: PlayerRankings, rankingThresholds: Thresholds): ConvertedPlayerRankings => {

	const doubleRate = convertDoubleMen(rankings, rankingThresholds);
	const mixedRate = convertMixedMen(rankings, rankingThresholds);
	const singleRate = convertSingleMen(rankings, rankingThresholds);

	return adjustNewRankings({ doubleRate,
		mixedRate,
		singleRate }, MALE);
};

export const convertFemalePlayers = (rankings: PlayerRankings, rankingThresholds: Thresholds): ConvertedPlayerRankings => {
	const doubleRate = convertDoubleWomen(rankings, rankingThresholds);
	const mixedRate = convertMixedWomen(rankings, rankingThresholds);
	const singleRate = convertSingleWomen(rankings, rankingThresholds);

	return adjustNewRankings({ doubleRate,
		mixedRate,
		singleRate }, FEMALE);
};

const convertSingleMen = (rankings: PlayerRankings, rankingThresholds: Thresholds): number => {
	const { singleSubLevel, singleRate } = rankings;
	const { singlesLowerBound, singlesUpperBound } = rankingThresholds[singleSubLevel]['men'];
	const upperSubLevel = rankLabelsOrder[rankLabelsOrder.indexOf(singleSubLevel) - 1];
	const upperBound = conversionTable[upperSubLevel].singlesMen;
	const lowerBound = conversionTable[singleSubLevel].singlesMen;
	return calculateNewRanking(singleRate, {
		lowerBound: singlesLowerBound,
		upperBound: singlesUpperBound,
	}, {
		lowerBound,
		upperBound,
	});
};

const convertDoubleMen = (rankings: PlayerRankings, rankingThresholds: Thresholds): number => {
	const { doubleSubLevel, doubleRate } = rankings;
	const { doublesLowerBound, doublesUpperBound } = rankingThresholds[doubleSubLevel]['men'];
	const upperSubLevel = rankLabelsOrder[rankLabelsOrder.indexOf(doubleSubLevel) - 1];
	const upperBound = conversionTable[upperSubLevel].doublesMen;
	const lowerBound = conversionTable[doubleSubLevel].doublesMen;
	return calculateNewRanking(doubleRate, {
		lowerBound: doublesLowerBound,
		upperBound: doublesUpperBound,
	}, {
		lowerBound,
		upperBound,
	});
};

const convertMixedMen = (rankings: PlayerRankings, rankingThresholds: Thresholds): number => {
	const { mixedSubLevel, mixedRate } = rankings;
	const { mixedDoublesLowerBound, mixedDoublesUpperBound } = rankingThresholds[mixedSubLevel]['men'];
	const upperSubLevel = rankLabelsOrder[rankLabelsOrder.indexOf(mixedSubLevel) - 1];
	const upperBound = conversionTable[upperSubLevel].mixedDoublesMen;
	const lowerBound = conversionTable[mixedSubLevel].mixedDoublesMen;
	return calculateNewRanking(mixedRate, {
		lowerBound: mixedDoublesLowerBound,
		upperBound: mixedDoublesUpperBound,
	}, {
		lowerBound,
		upperBound,
	});
};

const convertSingleWomen = (rankings: PlayerRankings, rankingThresholds: Thresholds): number => {
	const { singleSubLevel, singleRate } = rankings;
	const { singlesLowerBound, singlesUpperBound } = rankingThresholds[singleSubLevel]['women'];
	const upperSubLevel = rankLabelsOrder[rankLabelsOrder.indexOf(singleSubLevel) - 1];
	const upperBound = conversionTable[upperSubLevel].singlesWomen;
	const lowerBound = conversionTable[singleSubLevel].singlesWomen;
	return calculateNewRanking(singleRate, {
		lowerBound: singlesLowerBound,
		upperBound: singlesUpperBound,
	}, {
		lowerBound,
		upperBound,
	});
};

const convertDoubleWomen = (rankings: PlayerRankings, rankingThresholds: Thresholds): number => {
	const { doubleSubLevel, doubleRate } = rankings;
	const { doublesLowerBound, doublesUpperBound } = rankingThresholds[doubleSubLevel]['women'];
	const upperSubLevel = rankLabelsOrder[rankLabelsOrder.indexOf(doubleSubLevel) - 1];
	const upperBound = conversionTable[upperSubLevel].doublesWomen;
	const lowerBound = conversionTable[doubleSubLevel].doublesWomen;
	return calculateNewRanking(doubleRate, {
		lowerBound: doublesLowerBound,
		upperBound: doublesUpperBound,
	}, {
		lowerBound,
		upperBound,
	});
};

const convertMixedWomen = (rankings: PlayerRankings, rankingThresholds: Thresholds): number => {
	const { mixedSubLevel, mixedRate } = rankings;
	const { mixedDoublesLowerBound, mixedDoublesUpperBound } = rankingThresholds[mixedSubLevel]['women'];
	const upperSubLevel = rankLabelsOrder[rankLabelsOrder.indexOf(mixedSubLevel) - 1];
	const upperBound = conversionTable[upperSubLevel].mixedDoublesWomen;
	const lowerBound = conversionTable[mixedSubLevel].mixedDoublesWomen;
	return calculateNewRanking(mixedRate, {
		lowerBound: mixedDoublesLowerBound,
		upperBound: mixedDoublesUpperBound,
	}, {
		lowerBound,
		upperBound,
	});
};
