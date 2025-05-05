import { PlayerInfo } from '@api/player-ranking/useFetchPlayersRankings';
import { MatchOutcome } from '@components/MatchOutcome/MatchOutcome';
import { useTranslation } from '@hooks/useTranslation';
import { LOSES, Outcome, WINS, simulateSinglesMatch } from '@engine/simulation/simulate-match';
import { PlayerOutcomeProps } from '@components/PlayerOutcome/PlayerOutcome';
import styles from './SinglesMatchSimulation.module.css';

export type SinglesMatchSimulationProps = {
	playerA: PlayerInfo;
	playerB: PlayerInfo;
	matchFactor: number;
};

export const SinglesMatchSimulation = ({ playerA, playerB, matchFactor }: SinglesMatchSimulationProps) => {

	const { t } = useTranslation({ keyPrefix: 'SINGLES_MATCH_SIMULATION' });

	const singleRankingMe = playerA.convertedRankings.singleRate;
	const singleRankingOpponent = playerB.convertedRankings.singleRate;
	const matchResult = simulateSinglesMatch(singleRankingMe, singleRankingOpponent, matchFactor);

	const convertToOutcome = (player: PlayerInfo, points: number, outcome: Outcome): PlayerOutcomeProps => ({
		name: player.name,
		outcome,
		points,
		ranking: player.convertedRankings.singleRate,
	});

	return (
		<div className={styles.outcomes}>
			<MatchOutcome
				label={t('LABEL', { value: playerA.name })}
				playerA={convertToOutcome(playerA, matchResult[0].wins, WINS)}
				playerB={convertToOutcome(playerB, matchResult[0].losses, LOSES)}
			/>
			<MatchOutcome
				label={t('LABEL', { value: playerB.name })}
				playerA={convertToOutcome(playerA, matchResult[1].losses, LOSES)}
				playerB={convertToOutcome(playerB, matchResult[1].wins, WINS)}
			/>
		</div>
	);
};
