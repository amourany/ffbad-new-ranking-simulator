import { simulatePointsDistribution } from '@engine/simulation/simulate-points-distribution';
import { LOSES, WINS } from '@engine/simulation/simulate-match';

describe('simulate-points-distribution', () => {
	it('should distribute points when winning', () => {
		const playerA = 1000;
		const playerB = 1650;

		const pointsForPlayerA = simulatePointsDistribution(playerA, playerB, 40, WINS);
		const pointsForPlayerB = simulatePointsDistribution(playerB, playerA, 40, WINS);

		expect(pointsForPlayerA).toBe(24);
		expect(pointsForPlayerB).toBe(16);
	});

	it('should distribute points when losing', () => {
		const playerA = 1000;
		const playerB = 1650;

		const pointsForPlayerA = simulatePointsDistribution(playerA, playerB, 40, LOSES);
		const pointsForPlayerB = simulatePointsDistribution(playerB, playerA, 40, LOSES);

		expect(pointsForPlayerA).toBe(16);
		expect(pointsForPlayerB).toBe(24);
	});
});
