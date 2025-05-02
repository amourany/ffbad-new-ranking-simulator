import { calculateNewRanking } from '../engine/migrate-ranking';
import { conversionTable, rankLabelsOrder } from '../engine/conversion-table';
import { PlayerRankings } from '@api/player-ranking/useFetchPlayersRankings';

export type ConvertRankingFunctions = {
	convertSingle: (rankings: PlayerRankings) => number,
	convertDouble: (rankings: PlayerRankings) => number,
	convertMixed: (rankings: PlayerRankings) => number,
};

export const convertMalePlayers = () : ConvertRankingFunctions => ({
	convertDouble: convertDoubleMen,
	convertMixed: convertMixedMen,
	convertSingle: convertSingleMen,
});

export const convertFemalePlayers = () : ConvertRankingFunctions => ({
	convertDouble: convertDoubleWomen,
	convertMixed: convertMixedWomen,
	convertSingle: convertSingleWomen,
});

const convertSingleMen = (rankings: PlayerRankings): number => {
	const { singleSubLevel, singleRate,singleDownRate, singleUpRate } = rankings;
	const upperSubLevel = rankLabelsOrder[rankLabelsOrder.indexOf(singleSubLevel)-1];
	const upperBound = conversionTable[upperSubLevel].singlesMen;
	const lowerBound = conversionTable[singleSubLevel].singlesMen;
	return calculateNewRanking(singleRate, { lowerBound:singleDownRate,
		upperBound:singleUpRate }, { lowerBound,
		upperBound });
};

const convertDoubleMen = (rankings: PlayerRankings): number => {
	const { doubleSubLevel, doubleRate,doubleDownRate, doubleUpRate } = rankings;
	const upperSubLevel = rankLabelsOrder[rankLabelsOrder.indexOf(doubleSubLevel)-1];
	const upperBound = conversionTable[upperSubLevel].doublesMen;
	const lowerBound = conversionTable[doubleSubLevel].doublesMen;
	return calculateNewRanking(doubleRate, { lowerBound:doubleDownRate,
		upperBound:doubleUpRate }, { lowerBound,
		upperBound });
};

const convertMixedMen = (rankings: PlayerRankings): number => {
	const { mixedSubLevel, mixedRate,mixedDownRate, mixedUpRate } = rankings;
	const upperSubLevel = rankLabelsOrder[rankLabelsOrder.indexOf(mixedSubLevel)-1];
	const upperBound = conversionTable[upperSubLevel].mixedDoublesMen;
	const lowerBound = conversionTable[mixedSubLevel].mixedDoublesMen;
	return calculateNewRanking(mixedRate, { lowerBound:mixedDownRate,
		upperBound:mixedUpRate }, { lowerBound,
		upperBound });
};

const convertSingleWomen = (rankings: PlayerRankings): number => {
	const { singleSubLevel, singleRate,singleDownRate, singleUpRate } = rankings;
	const upperSubLevel = rankLabelsOrder[rankLabelsOrder.indexOf(singleSubLevel)-1];
	const upperBound = conversionTable[upperSubLevel].singlesWomen;
	const lowerBound = conversionTable[singleSubLevel].singlesWomen;
	return calculateNewRanking(singleRate, { lowerBound:singleDownRate,
		upperBound:singleUpRate }, { lowerBound,
		upperBound });
};

const convertDoubleWomen = (rankings: PlayerRankings): number => {
	const { doubleSubLevel, doubleRate,doubleDownRate, doubleUpRate } = rankings;
	const upperSubLevel = rankLabelsOrder[rankLabelsOrder.indexOf(doubleSubLevel)-1];
	const upperBound = conversionTable[upperSubLevel].doublesWomen;
	const lowerBound = conversionTable[doubleSubLevel].doublesWomen;
	return calculateNewRanking(doubleRate, { lowerBound:doubleDownRate,
		upperBound:doubleUpRate }, { lowerBound,
		upperBound });
};

const convertMixedWomen = (rankings: PlayerRankings): number => {
	const { mixedSubLevel, mixedRate,mixedDownRate, mixedUpRate } = rankings;
	const upperSubLevel = rankLabelsOrder[rankLabelsOrder.indexOf(mixedSubLevel)-1];
	const upperBound = conversionTable[upperSubLevel].mixedDoublesWomen;
	const lowerBound = conversionTable[mixedSubLevel].mixedDoublesWomen;
	return calculateNewRanking(mixedRate, { lowerBound:mixedDownRate,
		upperBound:mixedUpRate }, { lowerBound,
		upperBound });
};
