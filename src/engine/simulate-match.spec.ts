import { simulateMatch } from '@engine/simulate-match';

describe('simulateMatch', () => {
	it('should simulate a match when I am the higher ranked player', () => {
		const result = simulateMatch(1250, 1000)[0];
		expect(result.wins).toBe(11);
		expect(result.losses).toBe(-10);
	});
	it('should simulate a match when I am the lower ranked player', () => {
		const result = simulateMatch(1000, 1250)[0];
		expect(result.wins).toBe(32);
		expect(result.losses).toBe(-18);
	});
});
