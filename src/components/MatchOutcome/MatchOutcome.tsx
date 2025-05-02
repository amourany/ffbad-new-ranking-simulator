import styles from './MatchOutcome.module.css';

export type MatchOutcomeProps = {
	label: string;
	playerAOutcome: number;
	playerBOutcome: number;
	playerAName: string;
	playerBName: string;
	rankingPlayerA: number;
	rankingPlayerB: number;
};

export const MatchOutcome = ({
	label,
	playerAOutcome,
	playerBOutcome,
	playerAName,
	playerBName,
	rankingPlayerA,
	rankingPlayerB,
}: MatchOutcomeProps) => {
	const calculationPlayerALabel = playerAOutcome > 0 ? `+ ${playerAOutcome}` : `- ${Math.abs(playerAOutcome)}`;
	const calculationPlayerBLabel = playerBOutcome > 0 ? `+ ${playerBOutcome}` : `- ${Math.abs(playerBOutcome)}`;

	return <div className={styles.container}>
		<span>{label}</span>
		<div className={styles.calculationContainer}>
			<div className={styles[playerAOutcome > 0 ? 'win' : 'loss']}>
				<div>
					{playerAName}
					:
					{' '}
					<strong>
						{calculationPlayerALabel}
						{' '}
						points
					</strong>
				</div>
				<div className={styles.calculationDetails}>
					{rankingPlayerA}
					{' '}
					{calculationPlayerALabel}
					{' '}
					=
					{' '}
					{rankingPlayerA + playerAOutcome}
				</div>
			</div>
			<div className={styles[playerBOutcome > 0 ? 'win' : 'loss']}>
				<div>
					{playerBName}
					:
					{' '}
					<strong>
						{calculationPlayerBLabel}
						{' '}
						points
					</strong>
				</div>
				<div className={styles.calculationDetails}>
					{rankingPlayerB}
					{' '}
					{calculationPlayerBLabel}
					{' '}
					=
					{' '}
					{rankingPlayerB + playerBOutcome}
				</div>
			</div>
		</div>
	</div>;
};
