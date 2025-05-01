import { PlayerInfo } from '@api/player-ranking/useFetchPlayerRankings';
import { calculateNewRanking } from '../engine/migrate-ranking';
import { conversionTable, rankLabelsOrder } from '../engine/conversion-table';
import { Gender, MALE } from '../api/player-ranking/useFetchPlayerRankings';

export type ConvertRankingFunctions = {
	convertSingle: (playerInfo: PlayerInfo) => number,
	convertDouble: (playerInfo: PlayerInfo) => number,
	convertMixed: (playerInfo: PlayerInfo) => number,
};

export const useConvertRankings = (gender: Gender):ConvertRankingFunctions => {
	const convertSingle = gender === MALE ? convertSingleMen : convertSingleWomen;
	const convertDouble = gender === MALE ? convertDoubleMen : convertDoubleWomen;
	const convertMixed = gender === MALE ? convertMixedMen : convertMixedWomen;

	return {
		convertDouble,
		convertMixed,
		convertSingle,
	};
};

const convertSingleMen = (playerInfo: PlayerInfo): number => {
	const { rankings } = playerInfo;
	const { singleSubLevel, singleRate,singleDownRate, singleUpRate } = rankings;
	const upperSubLevel = rankLabelsOrder[rankLabelsOrder.indexOf(singleSubLevel)-1];
	const upperBound = conversionTable[upperSubLevel].singlesMen;
	const lowerBound = conversionTable[singleSubLevel].singlesMen;
	return calculateNewRanking(singleRate, { lowerBound:singleDownRate,
		upperBound:singleUpRate }, { lowerBound,
		upperBound });
};

const convertDoubleMen = (playerInfo: PlayerInfo): number => {
	const { rankings } = playerInfo;
	const { doubleSubLevel, doubleRate,doubleDownRate, doubleUpRate } = rankings;
	const upperSubLevel = rankLabelsOrder[rankLabelsOrder.indexOf(doubleSubLevel)-1];
	const upperBound = conversionTable[upperSubLevel].doublesMen;
	const lowerBound = conversionTable[doubleSubLevel].doublesMen;
	return calculateNewRanking(doubleRate, { lowerBound:doubleDownRate,
		upperBound:doubleUpRate }, { lowerBound,
		upperBound });
};

const convertMixedMen = (playerInfo: PlayerInfo): number => {
	const { rankings } = playerInfo;
	const { mixedSubLevel, mixedRate,mixedDownRate, mixedUpRate } = rankings;
	const upperSubLevel = rankLabelsOrder[rankLabelsOrder.indexOf(mixedSubLevel)-1];
	const upperBound = conversionTable[upperSubLevel].mixedDoublesMen;
	const lowerBound = conversionTable[mixedSubLevel].mixedDoublesMen;
	return calculateNewRanking(mixedRate, { lowerBound:mixedDownRate,
		upperBound:mixedUpRate }, { lowerBound,
		upperBound });
};

const convertSingleWomen = (playerInfo: PlayerInfo): number => {
	const { rankings } = playerInfo;
	const { singleSubLevel, singleRate,singleDownRate, singleUpRate } = rankings;
	const upperSubLevel = rankLabelsOrder[rankLabelsOrder.indexOf(singleSubLevel)-1];
	const upperBound = conversionTable[upperSubLevel].singlesWomen;
	const lowerBound = conversionTable[singleSubLevel].singlesWomen;
	return calculateNewRanking(singleRate, { lowerBound:singleDownRate,
		upperBound:singleUpRate }, { lowerBound,
		upperBound });
};

const convertDoubleWomen = (playerInfo: PlayerInfo): number => {
	const { rankings } = playerInfo;
	const { doubleSubLevel, doubleRate,doubleDownRate, doubleUpRate } = rankings;
	const upperSubLevel = rankLabelsOrder[rankLabelsOrder.indexOf(doubleSubLevel)-1];
	const upperBound = conversionTable[upperSubLevel].doublesWomen;
	const lowerBound = conversionTable[doubleSubLevel].doublesWomen;
	return calculateNewRanking(doubleRate, { lowerBound:doubleDownRate,
		upperBound:doubleUpRate }, { lowerBound,
		upperBound });
};

const convertMixedWomen = (playerInfo: PlayerInfo): number => {
	const { rankings } = playerInfo;
	const { mixedSubLevel, mixedRate,mixedDownRate, mixedUpRate } = rankings;
	const upperSubLevel = rankLabelsOrder[rankLabelsOrder.indexOf(mixedSubLevel)-1];
	const upperBound = conversionTable[upperSubLevel].mixedDoublesWomen;
	const lowerBound = conversionTable[mixedSubLevel].mixedDoublesWomen;
	return calculateNewRanking(mixedRate, { lowerBound:mixedDownRate,
		upperBound:mixedUpRate }, { lowerBound,
		upperBound });
};
