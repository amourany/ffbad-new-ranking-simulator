import { getRangeThursdayToThursday } from '@utils/dateRange';

describe('date range', () => {
	it('should return correct range for a Monday', () => {
		const initialDate = new Date('2025-07-14');
		const range = getRangeThursdayToThursday(initialDate);

		expect(range).toEqual({
			from: new Date('2025-07-10'),
			to: new Date('2025-07-17'),
		});
	});

	it('should return correct range for a Tuesday', () => {
		const initialDate = new Date('2025-07-15');
		const range = getRangeThursdayToThursday(initialDate);

		expect(range).toEqual({
			from: new Date('2025-07-10'),
			to: new Date('2025-07-17'),
		});
	});

	it('should return correct range for a Wednesday', () => {
		const initialDate = new Date('2025-07-16');
		const range = getRangeThursdayToThursday(initialDate);

		expect(range).toEqual({
			from: new Date('2025-07-10'),
			to: new Date('2025-07-17'),
		});
	});

	it('should return correct range for a Thursday', () => {
		const initialDate = new Date('2025-07-17');
		const range = getRangeThursdayToThursday(initialDate);

		expect(range).toEqual({
			from: new Date('2025-07-17'),
			to: new Date('2025-07-24'),
		});
	});

	it('should return correct range for a Friday', () => {
		const initialDate = new Date('2025-07-18');
		const range = getRangeThursdayToThursday(initialDate);

		expect(range).toEqual({
			from: new Date('2025-07-17'),
			to: new Date('2025-07-24'),
		});
	});

	it('should return correct range for a Saturday', () => {
		const initialDate = new Date('2025-07-19');
		const range = getRangeThursdayToThursday(initialDate);

		expect(range).toEqual({
			from: new Date('2025-07-17'),
			to: new Date('2025-07-24'),
		});
	});

	it('should return correct range for a Sunday', () => {
		const initialDate = new Date('2025-07-20');
		const range = getRangeThursdayToThursday(initialDate);

		expect(range).toEqual({
			from: new Date('2025-07-17'),
			to: new Date('2025-07-24'),
		});
	});

});