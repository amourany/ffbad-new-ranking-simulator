import { FEMALE, MALE, PlayerRankings } from '@api/player-ranking/useFetchPlayersRankings';
import { conversionTable, rankLabelsOrder } from '@engine/conversion/conversion-table';
import { adjustNewRankings, calculateNewRanking } from '@engine/conversion/migrate-ranking';

export type ConvertedPlayerRankings = {
	singleRate: number;
	doubleRate: number;
	mixedRate: number;
};

export const convertMalePlayers = (rankings: PlayerRankings): ConvertedPlayerRankings => {

	const doubleRate = convertDoubleMen(rankings);
	const mixedRate = convertMixedMen(rankings);
	const singleRate = convertSingleMen(rankings);

	return adjustNewRankings({ doubleRate,
		mixedRate,
		singleRate }, MALE);
};

export const convertFemalePlayers = (rankings: PlayerRankings): ConvertedPlayerRankings => {
	const doubleRate = convertDoubleWomen(rankings);
	const mixedRate = convertMixedWomen(rankings);
	const singleRate = convertSingleWomen(rankings);

	return adjustNewRankings({ doubleRate,
		mixedRate,
		singleRate }, FEMALE);
};

const convertSingleMen = (rankings: PlayerRankings): number => {
	const { singleSubLevel, singleRate, singleDownRate, singleUpRate } = rankings;
	const upperSubLevel = rankLabelsOrder[rankLabelsOrder.indexOf(singleSubLevel) - 1];
	const upperBound = conversionTable[upperSubLevel].singlesMen;
	const lowerBound = conversionTable[singleSubLevel].singlesMen;
	return calculateNewRanking(singleRate, {
		lowerBound: singleDownRate,
		upperBound: singleUpRate,
	}, {
		lowerBound,
		upperBound,
	});
};

const convertDoubleMen = (rankings: PlayerRankings): number => {
	const { doubleSubLevel, doubleRate, doubleDownRate, doubleUpRate } = rankings;
	const upperSubLevel = rankLabelsOrder[rankLabelsOrder.indexOf(doubleSubLevel) - 1];
	const upperBound = conversionTable[upperSubLevel].doublesMen;
	const lowerBound = conversionTable[doubleSubLevel].doublesMen;
	return calculateNewRanking(doubleRate, {
		lowerBound: doubleDownRate,
		upperBound: doubleUpRate,
	}, {
		lowerBound,
		upperBound,
	});
};

const convertMixedMen = (rankings: PlayerRankings): number => {
	const { mixedSubLevel, mixedRate, mixedDownRate, mixedUpRate } = rankings;
	const upperSubLevel = rankLabelsOrder[rankLabelsOrder.indexOf(mixedSubLevel) - 1];
	const upperBound = conversionTable[upperSubLevel].mixedDoublesMen;
	const lowerBound = conversionTable[mixedSubLevel].mixedDoublesMen;
	return calculateNewRanking(mixedRate, {
		lowerBound: mixedDownRate,
		upperBound: mixedUpRate,
	}, {
		lowerBound,
		upperBound,
	});
};

const convertSingleWomen = (rankings: PlayerRankings): number => {
	const { singleSubLevel, singleRate, singleDownRate, singleUpRate } = rankings;
	const upperSubLevel = rankLabelsOrder[rankLabelsOrder.indexOf(singleSubLevel) - 1];
	const upperBound = conversionTable[upperSubLevel].singlesWomen;
	const lowerBound = conversionTable[singleSubLevel].singlesWomen;
	return calculateNewRanking(singleRate, {
		lowerBound: singleDownRate,
		upperBound: singleUpRate,
	}, {
		lowerBound,
		upperBound,
	});
};

const convertDoubleWomen = (rankings: PlayerRankings): number => {
	const { doubleSubLevel, doubleRate, doubleDownRate, doubleUpRate } = rankings;
	const upperSubLevel = rankLabelsOrder[rankLabelsOrder.indexOf(doubleSubLevel) - 1];
	const upperBound = conversionTable[upperSubLevel].doublesWomen;
	const lowerBound = conversionTable[doubleSubLevel].doublesWomen;
	return calculateNewRanking(doubleRate, {
		lowerBound: doubleDownRate,
		upperBound: doubleUpRate,
	}, {
		lowerBound,
		upperBound,
	});
};

const convertMixedWomen = (rankings: PlayerRankings): number => {
	const { mixedSubLevel, mixedRate, mixedDownRate, mixedUpRate } = rankings;
	const upperSubLevel = rankLabelsOrder[rankLabelsOrder.indexOf(mixedSubLevel) - 1];
	const upperBound = conversionTable[upperSubLevel].mixedDoublesWomen;
	const lowerBound = conversionTable[mixedSubLevel].mixedDoublesWomen;
	return calculateNewRanking(mixedRate, {
		lowerBound: mixedDownRate,
		upperBound: mixedUpRate,
	}, {
		lowerBound,
		upperBound,
	});
};

export const isN1 = (subLevel: string, ranking?: number) => subLevel === 'N1' && ranking === null;
