export const calculateNewRanking = (ranking: number, currentBounds: Bounds, newRankingBounds: Bounds):number => {
	const { lowerBound, upperBound } = currentBounds;
	const { lowerBound:lowerNewRankingBound, upperBound:upperNewRankingBound } = newRankingBounds;
	const newRanking = (upperNewRankingBound - lowerNewRankingBound) * Math.log2(1 + (ranking - lowerBound) / (upperBound - lowerBound)) + lowerNewRankingBound;
	return Math.round(newRanking);
};

export type Bounds = {
	lowerBound: number,
	upperBound: number,
};
