import { resolveExtractor } from '@engine/simulation/resolve-rank-extractor';
import { malePlayerInfo } from '@jestConfig/__mocks__/playerInfoMock';

describe('resolveExtractor', () => {
	it('should resolve for singles matches', () => {
		const playerInfo = { ...malePlayerInfo,
			convertedRankings: { doubleRate: 3,
				mixedRate: 2,
				singleRate: 1 } };

		const extractor = resolveExtractor(false, false, false);

		expect(extractor(playerInfo)).toBe(1);
	});

	it('should resolve for doubles matches', () => {
		const playerInfo = { ...malePlayerInfo,
			convertedRankings: { doubleRate: 3,
				mixedRate: 2,
				singleRate: 1 } };

		const extractor = resolveExtractor(true, false, false);

		expect(extractor(playerInfo)).toBe(3);
	});

	it('should resolve for mixed matches', () => {
		const playerInfo = { ...malePlayerInfo,
			convertedRankings: { doubleRate: 3,
				mixedRate: 2,
				singleRate: 1 } };

		const extractor = resolveExtractor(true, false, true);

		expect(extractor(playerInfo)).toBe(2);
	});

	it('should resolve for cross-gender matches', () => {
		const playerInfo = { ...malePlayerInfo,
			convertedRankings: { doubleRate: 3,
				mixedRate: 2,
				singleRate: 1 } };

		const extractor = resolveExtractor(true, true, true);

		expect(extractor(playerInfo)).toBe(3);
	});
});
