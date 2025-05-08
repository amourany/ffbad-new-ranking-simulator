import { ReactElement, useState } from 'react';
import { Button } from '@mantine/core';
import { PlayerInMatch } from '@components/PlayerInMatch/PlayerInMatch';
import { PlayerInfo, PlayerLicences, useFetchPlayerRankings } from '@api/player-ranking/useFetchPlayerRankings';
import { SinglesMatchSimulation } from '@components/MatchSimulation/SinglesMatchSimulation/SinglesMatchSimulation';
import styles from './MatchSimulatorPage.module.css';
import { useTranslation } from '@hooks/useTranslation';
import { useNavigate } from '@tanstack/react-router';
import { Route, SimulateRouteSearch } from '@routes/simulate';
import { DoublesMatchSimulation } from '@components/MatchSimulation/DoublesMatchSimulation/DoublesMatchSimulation';
import { IconUsersMinus, IconUsersPlus } from '@tabler/icons-react';
import { isMixedDoublesTeam } from '@engine/simulation/simulate-match';
import { MatchConfiguration } from '@components/MatchConfiguration/MatchConfiguration';
import { Title } from '@components/Title/Title';

export const MatchSimulatorPage = () => {

	const { playerA: playerALicence, playerB: playerBLicence, playerC: playerCLicence, playerD: playerDLicence } = Route.useSearch();
	const { t } = useTranslation({ keyPrefix: 'MATCH_SIMULATOR_PAGE' });
	const [
		playerLicences,
		setPlayerLicences,
	] = useState<PlayerLicences>({ playerA:playerALicence,
		playerB: playerBLicence,
		playerC: playerCLicence,
		playerD: playerDLicence });
	const [
		isDoublesMatch,
		setIsDoublesMatch,
	] = useState<boolean>(!!playerCLicence || !!playerDLicence);
	const [
		isCrossGenderMatch,
		setIsCrossGenderMatch,
	] = useState<boolean>(false);
	const [
		matchMultiplyingFactor,
		setMatchMultiplyingFactor,
	] = useState<number>(1);
	const navigate = useNavigate({ from: Route.fullPath });

	const addUrlSearchParam = async (search: SimulateRouteSearch) => {
		await navigate({ search: (previousSearch: SimulateRouteSearch) => ({ ...previousSearch,
			...search }) });
	};

	const addPlayerA = async (licence: number) => {
		setPlayerLicences({ ...playerLicences,
			playerA: licence });
		await addUrlSearchParam({ playerA: licence });
	};
	const addPlayerB = async (licence: number) => {
		setPlayerLicences({ ...playerLicences,
			playerB: licence });
		await addUrlSearchParam({ playerB: licence });
	};
	const addPlayerC = async (licence: number) => {
		setPlayerLicences({ ...playerLicences,
			playerC: licence });
		await addUrlSearchParam({ playerC: licence });
	};
	const addPlayerD = async (licence: number) => {
		setPlayerLicences({ ...playerLicences,
			playerD: licence });
		await addUrlSearchParam({ playerD: licence });
	};

	const clearPlayerA = async () => {
		setPlayerLicences({ ...playerLicences,
			playerA: undefined });
		await addUrlSearchParam({ playerA: undefined });
	};
	const clearPlayerB = async () => {
		setPlayerLicences({ ...playerLicences,
			playerB: undefined });
		await addUrlSearchParam({ playerB: undefined });
	};
	const clearPlayerC = async () => {
		setPlayerLicences({ ...playerLicences,
			playerC: undefined });
		await addUrlSearchParam({ playerC: undefined });
	};
	const clearPlayerD = async () => {
		setPlayerLicences({ ...playerLicences,
			playerD: undefined });
		await addUrlSearchParam({ playerD: undefined });
	};

	const { data:playerA } = useFetchPlayerRankings(playerLicences.playerA);
	const { data:playerB } = useFetchPlayerRankings(playerLicences.playerB);
	const { data:playerC } = useFetchPlayerRankings(playerLicences.playerC);
	const { data:playerD } = useFetchPlayerRankings(playerLicences.playerD);

	const isMixedDoubles = isMixedDoublesTeam(playerA?.gender, playerC?.gender) && isMixedDoublesTeam(playerB?.gender, playerD?.gender);

	const renderMatchResults = () => {
		if (isDoublesMatch) {
			if (!!playerA && !!playerB && !!playerC && !!playerD) {
				const mixedDoublesExtractor = (player: PlayerInfo) => player.convertedRankings.mixedRate;
				const doublesExtractor = (player: PlayerInfo) => player.convertedRankings.doubleRate;
				const mixedOrCrossGenderExtractor = isCrossGenderMatch ?  doublesExtractor: mixedDoublesExtractor;

				const rankingExtractor = isMixedDoubles ?  mixedOrCrossGenderExtractor:doublesExtractor;

				return <DoublesMatchSimulation
					matchFactor={matchMultiplyingFactor}
					playerA={playerA}
					playerB={playerB}
					playerC={playerC}
					playerD={playerD}
					rankingExtractor={rankingExtractor}
				/>;
			}
		} else {
			if (!!playerA && !!playerB) {
				return <SinglesMatchSimulation
					matchFactor={matchMultiplyingFactor}
					playerA={playerA}
					playerB={playerB}
				/>;
			}
		}
		return null;
	};

	const switchMatchType = async () => {
		setIsDoublesMatch(!isDoublesMatch);
		setPlayerLicences({ ...playerLicences,
			playerC: undefined,
			playerD: undefined });
		await addUrlSearchParam({ playerC: undefined,
			playerD: undefined });
	};

	const renderMatchTypeSwitch = (children: ReactElement) => (
		<div className={styles.button}>
			<Button
				color= 'black'
				onClick={switchMatchType}
				variant='subtle'
			>
				{children}
			</Button>
		</div>
	);

	return <div className={styles.container}>
		<div className={styles.titleRow}>
			<Title
				label={isDoublesMatch ? t('DOUBLES_TITLE'): t('SINGLES_TITLE')}
				tooltipContent={[
					t('DOUBLES_TOOLTIP_1'),
					t('DOUBLES_TOOLTIP_2'),
				]}
				withTooltip = {isDoublesMatch}
			/>
			{isDoublesMatch ? renderMatchTypeSwitch(<>
				<IconUsersMinus />
				<div className={styles.buttonLabel}>{t('SIMULATE_SINGLES_MATCH')}</div>
			</>) :
				renderMatchTypeSwitch(<>
					<IconUsersPlus />
					<div className={styles.buttonLabel}>{t('SIMULATE_DOUBLES_MATCH')}</div>
				</>)}
		</div>
		<div className={styles.playerInputsContainer}>
			<div className={styles.team} >

				<PlayerInMatch
					label={t('PLAYER_A')}
					licence={playerLicences.playerA}
					onChange={addPlayerA}
					onClear={clearPlayerA}
				/>
				{isDoublesMatch ? <PlayerInMatch
					label={t('PLAYER_C')}
					licence={playerLicences.playerC}
					onChange={addPlayerC}
					onClear={clearPlayerC}
				/> : null}
			</div>
			<div className={styles.versus}>{t('VS')}</div>
			<div className={styles.team} >
				<PlayerInMatch
					label={t('PLAYER_B')}
					licence={playerLicences.playerB}
					onChange={addPlayerB}
					onClear={clearPlayerB}
				/>
				{isDoublesMatch ? <PlayerInMatch
					label={t('PLAYER_D')}
					licence={playerLicences.playerD}
					onChange={addPlayerD}
					onClear={clearPlayerD}
				/> : null}
			</div>
		</div>
		<div className={styles.configuration}>
			<MatchConfiguration
				isMixedDoublesMatch={isMixedDoubles}
				onMatchTypeChange={setIsCrossGenderMatch}
				onTournamentTypeChange={setMatchMultiplyingFactor}
			/>
		</div>
		{renderMatchResults()}
	</div>;

};
