import { adjustNewRankings } from '@engine/conversion/migrate-ranking';
import { FEMALE, MALE } from '@api/player-ranking/useFetchPlayerRankings';

describe('convertRankings', () => {
	it('should adjust for a male player', () => {
		const rankings = adjustNewRankings({ doubleRate:700,
			mixedRate:500,
			singleRate: 1050 }, MALE);
		expect(rankings).toStrictEqual({ doubleRate:700,
			mixedRate:550,
			singleRate: 1050 });
	});

	it('should adjust for a female player', () => {
		const rankings = adjustNewRankings({ doubleRate:1000,
			mixedRate:500,
			singleRate: 700 }, FEMALE);
		expect(rankings).toStrictEqual({ doubleRate:1000,
			mixedRate:520,
			singleRate: 700 });
	});
});
