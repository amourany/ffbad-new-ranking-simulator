import { PlayerOutcome, PlayerOutcomeProps } from '@components/PlayerOutcome/PlayerOutcome';
import styles from './MatchOutcome.module.css';

export type MatchOutcomeProps = {
	label: string;
	playerA: PlayerOutcomeProps;
	playerB: PlayerOutcomeProps;
	playerC?: PlayerOutcomeProps;
	playerD?: PlayerOutcomeProps;
};

export const MatchOutcome = ({
	label,
	playerA,
	playerB,
	playerC,
	playerD,
}: MatchOutcomeProps) => <div className={styles.container}>
	<span>{label}</span>
	<div className={styles.calculationContainer}>
		<div className={styles.team}>
			<PlayerOutcome {...playerA} />
			{playerC ? <PlayerOutcome {...playerC} /> : null}
		</div>
		<div className={styles.team}>
			<PlayerOutcome {...playerB} />
			{playerD ? <PlayerOutcome {...playerD} /> : null}
		</div>
	</div>
</div>;
