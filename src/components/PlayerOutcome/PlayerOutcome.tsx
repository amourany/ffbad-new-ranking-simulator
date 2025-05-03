import { Outcome, WINS } from '@engine/simulation/simulate-match';
import styles from './PlayerOutcome.module.css';

export type PlayerOutcomeProps = {
	outcome: Outcome;
	ranking: number;
	points: number;
	name: string;
};

export const PlayerOutcome = ({ outcome, ranking, points, name }: PlayerOutcomeProps) => {
	const calculationLabel = outcome === WINS ? `+ ${points}` : `- ${Math.abs(points)}`;

	return <div className={styles[outcome === WINS ? 'win' : 'loss']}>
		<div>
			{name}
			:
			{' '}
			<strong>
				{calculationLabel}
				{' '}
				points
			</strong>
		</div>
		<div className={styles.calculationDetails}>
			{ranking}
			{' '}
			{calculationLabel}
			{' '}
			=
			{' '}
			{ranking + points}
		</div>
	</div>;
};
