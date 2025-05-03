import {adjustNewRankings} from "@engine/conversion/migrate-ranking";
import {FEMALE, MALE} from "@api/player-ranking/useFetchPlayersRankings";

describe('convertRankings', () => {
    it('should adjust for a male player', () => {
        const rankings = adjustNewRankings({singleRate: 1050, doubleRate:700, mixedRate:500}, MALE);
        expect(rankings).toStrictEqual({singleRate: 1050, doubleRate:700, mixedRate:550});
    });

    it('should adjust for a female player', () => {
        const rankings = adjustNewRankings({singleRate: 700, doubleRate:1000, mixedRate:500}, FEMALE);
        expect(rankings).toStrictEqual({singleRate: 700, doubleRate:1000, mixedRate:520});
    });
})
