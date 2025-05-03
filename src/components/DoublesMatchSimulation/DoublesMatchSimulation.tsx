import { PlayerInfo } from '@api/player-ranking/useFetchPlayersRankings';
import { useTranslation } from '@hooks/useTranslation';
import { MatchOutcome } from '@components/MatchOutcome/MatchOutcome';
import { LOSES, Outcome, WINS, simulateDoublesMatch } from '@engine/simulation/simulate-match';
import { simulatePointsDistribution } from '@engine/simulation/simulate-points-distribution';
import { PlayerOutcomeProps } from '@components/PlayerOutcome/PlayerOutcome';
import styles from './DoublesMatchSimulation.module.css';

export type DoublesMatchSimulationProps = {
	playerA: PlayerInfo,
	playerB: PlayerInfo,
	playerC: PlayerInfo,
	playerD: PlayerInfo
};
export const DoublesMatchSimulation = ({ playerA, playerB, playerC, playerD }:DoublesMatchSimulationProps) => {
	const { t } = useTranslation({ keyPrefix: 'DOUBLES_MATCH_SIMULATION' });

	const playerADoublesRanking = playerA.convertedRankings.doubleRate;
	const playerBDoublesRanking = playerB.convertedRankings.doubleRate;
	const playerCDoublesRanking = playerC.convertedRankings.doubleRate;
	const playerDDoublesRanking = playerD.convertedRankings.doubleRate;

	const matchResult = simulateDoublesMatch(playerADoublesRanking + playerCDoublesRanking, playerBDoublesRanking + playerDDoublesRanking);

	const convertToOutcome = (player: PlayerInfo, teammate: PlayerInfo, pointsToShare: number, outcome: Outcome): PlayerOutcomeProps => ({
		name: player.name,
		outcome,
		points: simulatePointsDistribution(player.convertedRankings.doubleRate, teammate.convertedRankings.doubleRate, pointsToShare, outcome),
		ranking: player.convertedRankings.doubleRate,
	});

	return (
		<div className={styles.outcomes}>
			<MatchOutcome
				label={t('LABEL', { playerA: playerA.name,
					playerB: playerC.name })}
				playerA={convertToOutcome(playerA, playerC, matchResult[0].wins, WINS)}
				playerB={convertToOutcome(playerB, playerD, matchResult[0].losses, LOSES)}
				playerC={convertToOutcome(playerC, playerA, matchResult[0].wins, WINS)}
				playerD={convertToOutcome(playerD, playerB, matchResult[0].losses, LOSES)}
			/>
			<MatchOutcome
				label={t('LABEL', { playerA: playerB.name,
					playerB: playerD.name })}
				playerA={convertToOutcome(playerA, playerC, matchResult[1].losses, LOSES)}
				playerB={convertToOutcome(playerB, playerD, matchResult[1].wins, WINS)}
				playerC={convertToOutcome(playerC, playerA, matchResult[1].losses, LOSES)}
				playerD={convertToOutcome(playerD, playerB, matchResult[1].wins, WINS)}
			/>
		</div>
	);
};
