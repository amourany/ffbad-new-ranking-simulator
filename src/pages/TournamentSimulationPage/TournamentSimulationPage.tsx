import { Team } from '@components/Team/Team';
import { Title } from '@components/Title/Title';
import { SinglesDoublesSwitcher } from '@components/SinglesDoublesSwitcher/SinglesDoublesSwitcher';
import { useTranslation } from '@hooks/useTranslation';
import { MatchConfiguration } from '@components/MatchConfiguration/MatchConfiguration';
import { useTournamentConfigurationStore } from '@store/tournament-configuration';
import { PlayersIndexes, usePlayersStore } from '@store/players';
import { Button, useMantineTheme } from '@mantine/core';
import { TournamentMatch } from '@components/TournamentMatch/TournamentMatch';
import { LOSES, WINS, isMixedDoublesTeam } from '@engine/simulation/simulate-match';
import { MatchOutcome } from '@components/MatchOutcome/MatchOutcome';
import { PlayerInfo, useFetchPlayerRankings } from '@api/player-ranking/useFetchPlayerRankings';
import { PlayerOutcomeProps } from '@components/PlayerOutcome/PlayerOutcome';
import { simulatePointsDistribution } from '@engine/simulation/simulate-points-distribution';
import { resolveExtractor } from '@engine/simulation/resolve-rank-extractor';
import styles from './TournamentSimulationPage.module.css';
import { IconPlus } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect } from 'react';

const MAX_MATCH_SIZE = 15;

export const TournamentSimulationPage = () => {

	const theme = useMantineTheme();
	const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`, true);

	const players = usePlayersStore(state => state.players);
	const updatePlayer = usePlayersStore(state => state.updatePlayer);
	const removePlayer = usePlayersStore(state => state.removePlayer);

	const opponents = usePlayersStore(state => state.opponents);
	const addMatch = usePlayersStore(state => state.addMatch);
	const clearTournament = usePlayersStore(state => state.clearTournament);

	const isDoublesMatch = useTournamentConfigurationStore(state => state.isDoublesMatch);
	const isCrossGenderMatch = useTournamentConfigurationStore(state => state.isCrossGenderMatch);
	const setIsDoublesMatch = useTournamentConfigurationStore(state => state.setIsDoublesMatch);
	const setIsCrossGenderMatch = useTournamentConfigurationStore(state => state.setIsCrossGenderMatch);
	const setMatchMultiplyingFactor = useTournamentConfigurationStore(state => state.setMatchMultiplyingFactor);

	const { t } = useTranslation({ keyPrefix: 'TOURNAMENT_SIMULATION_PAGE' });

	const { data:playerA } = useFetchPlayerRankings(players[PlayersIndexes.PLAYER_A]);
	const { data:playerB } = useFetchPlayerRankings(players[PlayersIndexes.PLAYER_B]);

	const onTournamentTypeChange = () => {
		setIsDoublesMatch(!isDoublesMatch);
		clearTournament();
	};

	const isMixedDoubles = isMixedDoublesTeam(playerA?.gender, playerB?.gender);

	useEffect(() => {
		setIsCrossGenderMatch(!isMixedDoubles);
	}, [
		isMixedDoubles,
	]);

	const convertToOutcome = (player: PlayerInfo, teammate?: PlayerInfo): PlayerOutcomeProps => {
		const rankingExtractor = resolveExtractor(isDoublesMatch, isCrossGenderMatch, isMixedDoubles);

		const points = opponents.reduce((acc, curr) => {
			if(!!teammate) {
				const share = simulatePointsDistribution(rankingExtractor(player), rankingExtractor(teammate), curr.points, curr.points >= 0 ? WINS : LOSES);
				return acc + share;
			}
			return acc + curr.points;
		}, 0);

		return ({
			name: player.name,
			outcome: points >= 0 ? WINS : LOSES,
			points,
			ranking: rankingExtractor(player),
		});
	};

	const renderTournamentOutcome = () => (
		<>
			{playerA && !isDoublesMatch ?
				<MatchOutcome
					label={t('TOURNAMENT_RESULT')}
					playerA={convertToOutcome(playerA)}
				/>
				:null}
			{playerA && playerB && isDoublesMatch ?
				<MatchOutcome
					label={t('TOURNAMENT_RESULT')}
					playerA={convertToOutcome(playerA, playerB)}
					playerC={convertToOutcome(playerB, playerA)}
				/>
				:null}
		</>
	);

	return (
		<div className={styles.container}>
			<div className={styles.titleRow}>
				<Title
					label={isDoublesMatch ? t('DOUBLES_TITLE'): t('SINGLES_TITLE')}
				/>
				<SinglesDoublesSwitcher
					doublesLabel={t('SIMULATE_DOUBLES_TOURNAMENT')}
					isDoublesMatch={isDoublesMatch}
					onChange={onTournamentTypeChange}
					singlesLabel={t('SIMULATE_SINGLES_TOURNAMENT')}
				/>
			</div>
			<div className={styles.teamOverview}>
				<div className={styles.team}>
					<Team
						isDoublesMatch={isDoublesMatch}
						licenceA={players[PlayersIndexes.PLAYER_A]}
						licenceB={players[PlayersIndexes.PLAYER_B]}
						onPlayerAChange={updatePlayer(PlayersIndexes.PLAYER_A)}
						onPlayerAClear={() => removePlayer(PlayersIndexes.PLAYER_A)}
						onPlayerBChange={updatePlayer(PlayersIndexes.PLAYER_B)}
						onPlayerBClear={() => removePlayer(PlayersIndexes.PLAYER_B)}
						playerALabel={t('PLAYER_A')}
						playerBLabel={t('PLAYER_B')}
					/>
				</div>
				<div className={styles.outcome}>
					{isDesktop ? renderTournamentOutcome():null}
				</div>
			</div>
			<div className={styles.configuration}>
				<MatchConfiguration
					isMixedDoublesMatch={isMixedDoubles}
					onMatchTypeChange={setIsCrossGenderMatch}
					onTournamentTypeChange={setMatchMultiplyingFactor}
				/>
			</div>
			<div className={styles.match}>
				{opponents.map((opponent, index) => (
					<TournamentMatch
						key={opponent.matchId}
						matchId={opponent.matchId}
						matchIndex={index}
					/>
				))}
				{opponents.length < MAX_MATCH_SIZE ? <div className={styles.addMatch}>
					<Button
						onClick={addMatch}
						variant='subtle'
					>
						<IconPlus />
						{t('ADD_MATCH')}
					</Button>
				</div> : null}
			</div>
			{!isDesktop && opponents.length > 0 ? renderTournamentOutcome():null}
		</div>
	);
};
