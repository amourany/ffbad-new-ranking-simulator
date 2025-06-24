import { Team } from '@components/Team/Team';
import { ActionIcon, Divider, SegmentedControl, useMantineTheme } from '@mantine/core';
import { useTranslation } from '@hooks/useTranslation';
import { PlayersIndexes, usePlayersStore } from '@store/players';
import { useTournamentConfigurationStore } from '@store/tournament-configuration';
import { MatchSimulation } from '@components/MatchSimulation/MatchSimulation';
import styles from './TournamentMatch.module.css';
import { IconX } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { DisplayWinProbabilities } from '@components/DisplayWinProbabilities/DisplayWinProbabilities';

export type TournamentMatchProps = {
	matchId: string
	matchIndex: number
};

export const TournamentMatch = ({ matchId, matchIndex }: TournamentMatchProps) => {

	const { t } = useTranslation({ keyPrefix: 'TOURNAMENT_MATCH' });
	const theme = useMantineTheme();
	const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`, true);

	const removeMatch = usePlayersStore(state => state.removeMatch);
	const players = usePlayersStore(state => state.players);
	const opponents = usePlayersStore(state => state.opponents);
	const updateOpponent = usePlayersStore(state => state.updateOpponent);
	const toggleOpponentWinningAgainstThisTeam = usePlayersStore(state => state.toggleOpponentWinningAgainstThisTeam);
	const clearOpponent = usePlayersStore(state => state.clearOpponent);
	const updateMatchResult = usePlayersStore(state => state.updateMatchResult);

	const isDoublesMatch = useTournamentConfigurationStore(state => state.isDoublesMatch);
	const isMixedDoubles = useTournamentConfigurationStore(state => state.isMixedDoubles);
	const isCrossGenderMatch = useTournamentConfigurationStore(state => state.isCrossGenderMatch);
	const matchMultiplyingFactor = useTournamentConfigurationStore(state => state.matchMultiplyingFactor);

	const { players: opponent, winningAgainstThisTeam, winningChances } = opponents.find(opponent => opponent.matchId === matchId)!;

	return (<div className={styles.match}>
		<div className={styles.matchTitleContainer}>
			<span className={styles.titleContainer}>
				<span className={styles.matchTitle}>{t('MATCH_INDEX', { index: matchIndex+1 })}</span>
				{winningChances ? <DisplayWinProbabilities
					probabilities={winningChances}
					variant='large'
				/>:null}
			</span>
			<ActionIcon
				color= 'black'
				onClick={() => removeMatch(matchId)}
				size='xs'
				variant='subtle'
			>
				<IconX />
			</ActionIcon>
		</div>
		<div className={styles.opponent}>
			<div className={styles.outcome}>
				<SegmentedControl
					className={styles.winLoseSelector}
					color={winningAgainstThisTeam? 'green' : 'red'}
					data={[
						{
							label: t('WINS'),
							value: 'true',
						},
						{
							label: t('LOSES'),
							value: 'false',
						},
					]}
					onChange={(value) => toggleOpponentWinningAgainstThisTeam(matchId)(value === 'true')}
				/>
			</div>
			<div className={styles.against}>{t('AGAINST')}</div>
			<div className={styles.opponentTeam}>
				<Team
					isDoublesMatch={isDoublesMatch}
					licenceA={opponent[PlayersIndexes.PLAYER_A]}
					licenceB={opponent[PlayersIndexes.PLAYER_B]}
					onPlayerAChange={updateOpponent(matchId, PlayersIndexes.PLAYER_A)}
					onPlayerAClear={() => clearOpponent(matchId, PlayersIndexes.PLAYER_A)}
					onPlayerBChange={updateOpponent(matchId, PlayersIndexes.PLAYER_B)}
					onPlayerBClear={() => clearOpponent(matchId, PlayersIndexes.PLAYER_B)}
					playerALabel={t('PLAYER_A')}
					playerBLabel={t('PLAYER_B')}
				/>
			</div>
			<Divider
				className={styles.divider}
				orientation={isDesktop ? 'vertical' : 'horizontal'}
				size="sm"
			/>
			<div className={styles.simulation}>
				<MatchSimulation
					isTeamAWinning={winningAgainstThisTeam}
					matchConfiguration={{
						isCrossGenderMatch,
						isDoublesMatch,
						isMixedDoubles,
						matchMultiplyingFactor,
					}}
					playerALicence={players[PlayersIndexes.PLAYER_A]}
					playerBLicence={opponent[PlayersIndexes.PLAYER_A]}
					playerCLicence={players[PlayersIndexes.PLAYER_B]}
					playerDLicence={opponent[PlayersIndexes.PLAYER_B]}
					updateMatchResult={updateMatchResult(matchId)}
					variant='small'
				/>
			</div>
		</div>
	</div>);
};
