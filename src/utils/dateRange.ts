import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import fr from 'dayjs/locale/fr';

const dayjsWithWeekday = dayjs;
dayjsWithWeekday.extend(weekday);
dayjsWithWeekday.locale({ ...fr,
	weekStart: 4 });

export type DateRange = {
	from: Date,
	to: Date,
};

export const getRangeThursdayToThursday = (initialDate: Date): DateRange => {

	const today = dayjsWithWeekday(initialDate);

	return {
		from: today.weekday(0).toDate(),
		to: today.weekday(7).toDate(),
	};
};