import { Gender, MALE} from "@api/player-ranking/useFetchPlayersRankings";
import {
	MAX_RANKING,
	MEN_MIXED_MAX_RANKING,
	MIN_RANKING,
	MIN_RANKING_DELTA,
	WOMEN_MIXED_MAX_RANKING
} from "@engine/conversion/conversion-table";
import {ConvertedPlayerRankings} from "@engine/conversion/convert-rankings";

export const calculateNewRanking = (ranking: number, currentBounds: Bounds, newRankingBounds: Bounds):number => {
	const { lowerBound, upperBound } = currentBounds;
	const { lowerBound:lowerNewRankingBound, upperBound:upperNewRankingBound } = newRankingBounds;
	const newRanking = (upperNewRankingBound - lowerNewRankingBound) * Math.log2(1 + (ranking - lowerBound) / (upperBound - lowerBound)) + lowerNewRankingBound;
	return Math.round(newRanking);
};

export const adjustNewRankings = ({singleRate, doubleRate, mixedRate}: ConvertedPlayerRankings, gender: Gender): ConvertedPlayerRankings => {
	const playerMaxRanking = Math.max(singleRate, doubleRate, mixedRate);
	const playerMinRanking = Math.min(MAX_RANKING, playerMaxRanking) - MIN_RANKING_DELTA;

	return {
		singleRate: Math.max(singleRate, playerMinRanking),
		doubleRate: Math.max(doubleRate, playerMinRanking),
		mixedRate: Math.max(mixedRate, adjustMixedRankingByGender(playerMinRanking, gender))
	}
}

const adjustMixedRankingByGender = (playerMinRanking: number, gender: Gender): number => {
	if(gender === MALE) {
		return playerMinRanking;
	} else {
		return MIN_RANKING + (playerMinRanking - MIN_RANKING) * ((WOMEN_MIXED_MAX_RANKING - MIN_RANKING) / (MEN_MIXED_MAX_RANKING - MIN_RANKING))
	}
}

export type Bounds = {
	lowerBound: number,
	upperBound: number,
};
