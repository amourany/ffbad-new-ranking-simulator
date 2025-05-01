import { calculateNewRanking } from './migrate-ranking';

describe('convertToNewRanking', () => {
	it('should convert ranking to new ranking', () => {
		const currentRanking = 300;
		const upperBound = 490.87;
		const lowerBound = 248.03;
		const newRankingUpperBound = 2200;
		const newRankingLowerBound = 2000;

		const newRanking = calculateNewRanking(currentRanking, { lowerBound,
			upperBound }, { lowerBound: newRankingLowerBound,
			upperBound: newRankingUpperBound });

		expect(newRanking).toBe(2056);
	});
});
