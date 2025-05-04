import { Outcome, WINS } from '@engine/simulation/simulate-match';
import styles from './PlayerOutcome.module.css';
import { useTranslation } from '@hooks/useTranslation';

export type PlayerOutcomeProps = {
	outcome: Outcome;
	ranking: number;
	points: number;
	name: string;
};

export const PlayerOutcome = ({ outcome, ranking, points, name }: PlayerOutcomeProps) => {
	const { t } = useTranslation({ keyPrefix: 'PLAYER_OUTCOME' });
	const isWin = outcome === WINS;

	return <div className={[
		styles[outcome === WINS ? 'win' : 'loss'],
		styles.player,
	].join(' ')}
	>
		<div className={styles.name}>
			{t('NAME', { name })}
			<div className={styles.points}>{isWin ? t('POINTS_WINS', { points }) : t('POINTS_LOSES', { points: Math.abs(points) })}</div>
		</div>
		<div className={styles.calculationDetails}>
			{isWin ? t('CALCULATION_DETAILS_WINS', { newRanking: ranking+points,
				points,
				ranking }) :
				t('CALCULATION_DETAILS_LOSES', { newRanking: ranking+points,
					points:Math.abs(points),
					ranking })}
		</div>
	</div>;
};
