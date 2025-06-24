import { PlayerInfo } from '@api/player-ranking/useFetchPlayerRankings';
import { useTranslation } from '@hooks/useTranslation';
import { MatchOutcome } from '@components/MatchOutcome/MatchOutcome';
import { LOSES, Outcome, WINS, simulateDoublesMatch } from '@engine/simulation/simulate-match';
import { simulatePointsDistribution } from '@engine/simulation/simulate-points-distribution';
import { PlayerOutcomeProps } from '@components/PlayerOutcome/PlayerOutcome';
import styles from './DoublesMatchSimulation.module.css';
import { mean } from 'mathjs';
import { useEffect, useMemo } from 'react';

export type DoublesMatchSimulationProps = {
	playerA: PlayerInfo,
	playerB: PlayerInfo,
	playerC: PlayerInfo,
	playerD: PlayerInfo,
	rankingExtractor: (player: PlayerInfo) => number,
	matchFactor: number
	isTeamAWinning?: boolean;
	updateMatchResult?: (points: number, winningChances: number) => void;
	variant?: 'small' | 'large';
};
export const DoublesMatchSimulation = ({ playerA, playerB, playerC, playerD, rankingExtractor, matchFactor, isTeamAWinning, variant, updateMatchResult }:DoublesMatchSimulationProps) => {
	const { t } = useTranslation({ keyPrefix: 'DOUBLES_MATCH_SIMULATION' });

	const playerADoublesRanking = rankingExtractor(playerA);
	const playerBDoublesRanking = rankingExtractor(playerB);
	const playerCDoublesRanking = rankingExtractor(playerC);
	const playerDDoublesRanking = rankingExtractor(playerD);

	const matchResult = useMemo(() => simulateDoublesMatch(mean(playerADoublesRanking, playerCDoublesRanking), mean(playerBDoublesRanking, playerDDoublesRanking), matchFactor), [
		playerADoublesRanking,
		playerBDoublesRanking,
		playerCDoublesRanking,
		playerDDoublesRanking,
		matchFactor,
	]);

	useEffect(() => {
		if (updateMatchResult) {
			const points = isTeamAWinning ? matchResult[0].wins : matchResult[1].losses;
			const winningChances = matchResult[0].winningChances;
			updateMatchResult(points, winningChances);
		}
	}, [
		isTeamAWinning,
		matchResult,
	]);

	const convertToOutcome = (player: PlayerInfo, teammate: PlayerInfo, pointsToShare: number, outcome: Outcome): PlayerOutcomeProps => ({
		name: player.name,
		outcome,
		points: simulatePointsDistribution(rankingExtractor(player), rankingExtractor(teammate), pointsToShare, outcome),
		ranking: rankingExtractor(player),
	});

	const renderWinningTeam = () => (
		<MatchOutcome
			label={t('LABEL', { playerA: playerA.name,
				playerB: playerC.name })}
			playerA={convertToOutcome(playerA, playerC, matchResult[0].wins, WINS)}
			playerB={convertToOutcome(playerB, playerD, matchResult[0].losses, LOSES)}
			playerC={convertToOutcome(playerC, playerA, matchResult[0].wins, WINS)}
			playerD={convertToOutcome(playerD, playerB, matchResult[0].losses, LOSES)}
			variant={variant}
			winningChances={matchResult[0].winningChances}
		/>
	);

	const renderLosingTeam = () => (
		<MatchOutcome
			label={t('LABEL', { playerA: playerB.name,
				playerB: playerD.name })}
			playerA={convertToOutcome(playerA, playerC, matchResult[1].losses, LOSES)}
			playerB={convertToOutcome(playerB, playerD, matchResult[1].wins, WINS)}
			playerC={convertToOutcome(playerC, playerA, matchResult[1].losses, LOSES)}
			playerD={convertToOutcome(playerD, playerB, matchResult[1].wins, WINS)}
			variant={variant}
			winningChances={matchResult[1].winningChances}
		/>
	);

	const renderSmall = () => (<>{isTeamAWinning ? renderWinningTeam() : renderLosingTeam()}</>);

	const renderLarge = () => (
		<>
			{renderWinningTeam()}
			{renderLosingTeam()}
		</>
	);

	return (
		<div className={styles.outcomes}>
			{variant === 'small' ? renderSmall() : renderLarge()}
		</div>
	);
};
