import { ReactElement, useState } from 'react';
import { Button, Divider } from '@mantine/core';
import { PlayerInMatch } from '@components/PlayerInMatch/PlayerInMatch';
import { PlayerInfo, PlayerLicences, useFetchPlayersRankings } from '@api/player-ranking/useFetchPlayersRankings';
import { UseQueryResult } from '@tanstack/react-query';
import { SinglesMatchSimulation } from '@components/SinglesMatchSimulation/SinglesMatchSimulation';
import styles from './MatchSimulatorPage.module.css';
import { useTranslation } from '@hooks/useTranslation';
import { useNavigate } from '@tanstack/react-router';
import { Route, SimulateRouteSearch } from '@routes/simulate';
import { DoublesMatchSimulation } from '@components/DoublesMatchSimulation/DoublesMatchSimulation';
import { IconUsersMinus, IconUsersPlus } from '@tabler/icons-react';

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
	const fetchedPlayers = useFetchPlayersRankings(playerLicences);
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

	const playerA = fetchedPlayers.find(item => item[0] === 'playerA')?.[1] as UseQueryResult<PlayerInfo>;
	const playerB = fetchedPlayers.find(item => item[0] === 'playerB')?.[1] as UseQueryResult<PlayerInfo>;
	const playerC = fetchedPlayers.find(item => item[0] === 'playerC')?.[1] as UseQueryResult<PlayerInfo>;
	const playerD = fetchedPlayers.find(item => item[0] === 'playerD')?.[1] as UseQueryResult<PlayerInfo>;

	const renderMatchResults = () => {
		if (isDoublesMatch) {
			if (playerA?.data && playerB?.data && playerC?.data && playerD?.data) {
				return <DoublesMatchSimulation
					playerA={playerA.data}
					playerB={playerB.data}
					playerC={playerC.data}
					playerD={playerD.data}
				/>;
			}
		} else {
			if (playerA?.data && playerB?.data) {
				return <SinglesMatchSimulation
					playerA={playerA.data}
					playerB={playerB.data}
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
		<div className={styles.playerInputsContainer}>
			<div className={styles.team} >

				<PlayerInMatch
					isLoading={playerA?.isLoading ?? false}
					label={t('PLAYER_A')}
					onChange={addPlayerA}
					onClear={clearPlayerA}
					playerInfo={playerA?.data}
				/>
				{isDoublesMatch ? <PlayerInMatch
					isLoading={playerC?.isLoading ?? false}
					label={t('PLAYER_C')}
					onChange={addPlayerC}
					onClear={clearPlayerC}
					playerInfo={playerC?.data}
				/> : null}
			</div>
			<div className={styles.versus}>{t('VS')}</div>
			<div className={styles.team} >
				<PlayerInMatch
					isLoading={playerB?.isLoading ?? false}
					label={t('PLAYER_B')}
					onChange={addPlayerB}
					onClear={clearPlayerB}
					playerInfo={playerB?.data}
				/>
				{isDoublesMatch ? <PlayerInMatch
					isLoading={playerD?.isLoading ?? false}
					label={t('PLAYER_D')}
					onChange={addPlayerD}
					onClear={clearPlayerD}
					playerInfo={playerD?.data}
				/> : null}
			</div>
		</div>
		{isDoublesMatch ? renderMatchTypeSwitch(<>
			<IconUsersMinus />
			<div className={styles.buttonLabel}>{t('SIMULATE_SINGLES_MATCH')}</div>
		</>) :
			renderMatchTypeSwitch(<>
				<IconUsersPlus />
				<div className={styles.buttonLabel}>{t('SIMULATE_DOUBLES_MATCH')}</div>
			</>)}
		<Divider/>
		{renderMatchResults()}
	</div>;

};
