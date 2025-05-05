import { simulateDoublesMatch, simulateSinglesMatch } from '@engine/simulation/simulate-match';

describe('simulateMatch', () => {
	it('should simulate a singles match when I am the higher ranked player', () => {
		const result = simulateSinglesMatch(1250, 1000)[0];
		expect(result.wins).toBe(11);
		expect(result.losses).toBe(-10);
	});

	it('should simulate a singles match when I am the lower ranked player', () => {
		const result = simulateSinglesMatch(1000, 1250)[0];
		expect(result.wins).toBe(32);
		expect(result.losses).toBe(-18);
	});

	it('should simulate a doubles match when I am the higher ranked player', () => {
		const result = simulateDoublesMatch(1250, 1000)[0];
		expect(result.wins).toBe(22);
		expect(result.losses).toBe(-20);
	});

	it('should simulate a doubles match when I am the lower ranked player', () => {
		const result = simulateDoublesMatch(1000, 1250)[0];
		expect(result.wins).toBe(64);
		expect(result.losses).toBe(-36);
	});
});
