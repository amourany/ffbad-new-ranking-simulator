import { PlayerOutcome, PlayerOutcomeProps } from '@components/PlayerOutcome/PlayerOutcome';
import styles from './MatchOutcome.module.css';
import { DisplayWinProbabilities } from '@components/DisplayWinProbabilities/DisplayWinProbabilities';

export type MatchOutcomeProps = {
	label: string;
	playerA: PlayerOutcomeProps;
	playerB?: PlayerOutcomeProps;
	playerC?: PlayerOutcomeProps;
	playerD?: PlayerOutcomeProps;
	winningChances: number;
	variant?: 'small' | 'large';
};

export const MatchOutcome = ({
	label,
	playerA,
	playerB,
	playerC,
	playerD,
	winningChances,
	variant = 'large',
}: MatchOutcomeProps) => {
	const isLarge = variant === 'large';
	return <div className={[
		styles.container,
		styles[variant],
	].join(' ')}
	>
		{isLarge ? <span className={styles.title}>
			{label}
			{winningChances ? <DisplayWinProbabilities probabilities={winningChances} /> : null}
		</span>: null}
		<div className={styles.calculationContainer}>
			<div className={styles.team}>
				<PlayerOutcome
					{...playerA}
					variant={variant}
				/>
				{playerC ? <PlayerOutcome
					{...playerC}
					variant={variant}
				/> : null}
			</div>
			{isLarge ? <div className={styles.team}>
				{playerB ? <PlayerOutcome {...playerB} /> :null }
				{playerD ? <PlayerOutcome {...playerD} /> : null}
			</div> :null}
		</div>
	</div>;
};
