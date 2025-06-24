import { PlayerInfo } from '@api/player-ranking/useFetchPlayerRankings';
import { MatchOutcome } from '@components/MatchOutcome/MatchOutcome';
import { useTranslation } from '@hooks/useTranslation';
import { LOSES, Outcome, WINS, simulateSinglesMatch } from '@engine/simulation/simulate-match';
import { PlayerOutcomeProps } from '@components/PlayerOutcome/PlayerOutcome';
import styles from './SinglesMatchSimulation.module.css';
import { useEffect, useMemo } from 'react';

export type SinglesMatchSimulationProps = {
	playerA: PlayerInfo;
	playerB: PlayerInfo;
	matchFactor: number;
	isTeamAWinning?: boolean;
	updateMatchResult?: (points: number, winningChances: number) => void;
	variant?: 'small' | 'large';
};

export const SinglesMatchSimulation = ({ playerA, playerB, matchFactor, isTeamAWinning, updateMatchResult, variant }: SinglesMatchSimulationProps) => {

	const { t } = useTranslation({ keyPrefix: 'SINGLES_MATCH_SIMULATION' });

	const singleRankingMe = playerA.convertedRankings.singleRate;
	const singleRankingOpponent = playerB.convertedRankings.singleRate;
	const matchResult = useMemo(() => simulateSinglesMatch(singleRankingMe, singleRankingOpponent, matchFactor), [
		singleRankingMe,
		singleRankingOpponent,
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

	const convertToOutcome = (player: PlayerInfo, points: number, outcome: Outcome): PlayerOutcomeProps => ({
		name: player.name,
		outcome,
		points,
		ranking: player.convertedRankings.singleRate,
	});

	const renderWinningTeam = () => (
		<MatchOutcome
			label={t('LABEL', { value: playerA.name })}
			playerA={convertToOutcome(playerA, matchResult[0].wins, WINS)}
			playerB={convertToOutcome(playerB, matchResult[0].losses, LOSES)}
			variant={variant}
			winningChances={matchResult[0].winningChances}
		/>
	);

	const renderLosingTeam = () => (
		<MatchOutcome
			label={t('LABEL', { value: playerB.name })}
			playerA={convertToOutcome(playerA, matchResult[1].losses, LOSES)}
			playerB={convertToOutcome(playerB, matchResult[1].wins, WINS)}
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
