import { ReactElement, useState } from 'react';
import { Button, Popover } from '@mantine/core';
import { PlayerInMatch } from '@components/PlayerInMatch/PlayerInMatch';
import { PlayerInfo, PlayerLicences, useFetchPlayersRankings } from '@api/player-ranking/useFetchPlayersRankings';
import { UseQueryResult } from '@tanstack/react-query';
import { SinglesMatchSimulation } from '@components/MatchSimulation/SinglesMatchSimulation/SinglesMatchSimulation';
import styles from './MatchSimulatorPage.module.css';
import { useTranslation } from '@hooks/useTranslation';
import { useNavigate } from '@tanstack/react-router';
import { Route, SimulateRouteSearch } from '@routes/simulate';
import { DoublesMatchSimulation } from '@components/MatchSimulation/DoublesMatchSimulation/DoublesMatchSimulation';
import { IconInfoCircleFilled, IconUsersMinus, IconUsersPlus } from '@tabler/icons-react';
import { isMixedDoublesTeam } from '@engine/simulation/simulate-match';

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

	const { data:playerA, isLoading: playerALoading } = fetchedPlayers.find(item => item[0] === 'playerA')?.[1] as UseQueryResult<PlayerInfo>;
	const { data:playerB, isLoading: playerBLoading } = fetchedPlayers.find(item => item[0] === 'playerB')?.[1] as UseQueryResult<PlayerInfo>;
	const { data:playerC, isLoading: playerCLoading } = fetchedPlayers.find(item => item[0] === 'playerC')?.[1] as UseQueryResult<PlayerInfo>;
	const { data:playerD, isLoading: playerDLoading } = fetchedPlayers.find(item => item[0] === 'playerD')?.[1] as UseQueryResult<PlayerInfo>;

	const renderMatchResults = () => {
		if (isDoublesMatch) {
			if (!!playerA && !!playerB && !!playerC && !!playerD) {
				const isMixedDoubles = isMixedDoublesTeam(playerA.gender, playerC.gender) && isMixedDoublesTeam(playerB.gender, playerD.gender);
				const rankingExtractor = isMixedDoubles ? (player: PlayerInfo) => player.convertedRankings.mixedRate : (player: PlayerInfo) => player.convertedRankings.doubleRate;

				return <DoublesMatchSimulation
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

	const renderTitleWithTooltip = (title: string, tooltipContent: string[]) => (
		<>
			<span>{title}</span>
			<Popover
				position='bottom'
				shadow='md'
				width={300}
				withArrow
			>
				<Popover.Target>
					<IconInfoCircleFilled
						className={styles.icon}
						color="cornflowerblue"
					/>
				</Popover.Target>
				<Popover.Dropdown>
					{tooltipContent.map((content, index) => (
						<div key={index}>{content}</div>
					))}
				</Popover.Dropdown>
			</Popover>
		</>
	);

	return <div className={styles.container}>
		<div className={styles.titleRow}>
			<h1 className={styles.title}>
				{isDoublesMatch ? renderTitleWithTooltip(t('DOUBLES_TITLE'), [
					t('DOUBLES_TOOLTIP_1'),
					t('DOUBLES_TOOLTIP_2'),
				]) : t('SINGLES_TITLE')}
			</h1>
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
					isLoading={playerALoading ?? false}
					label={t('PLAYER_A')}
					onChange={addPlayerA}
					onClear={clearPlayerA}
					playerInfo={playerA}
				/>
				{isDoublesMatch ? <PlayerInMatch
					isLoading={playerCLoading ?? false}
					label={t('PLAYER_C')}
					onChange={addPlayerC}
					onClear={clearPlayerC}
					playerInfo={playerC}
				/> : null}
			</div>
			<div className={styles.versus}>{t('VS')}</div>
			<div className={styles.team} >
				<PlayerInMatch
					isLoading={playerBLoading ?? false}
					label={t('PLAYER_B')}
					onChange={addPlayerB}
					onClear={clearPlayerB}
					playerInfo={playerB}
				/>
				{isDoublesMatch ? <PlayerInMatch
					isLoading={playerDLoading ?? false}
					label={t('PLAYER_D')}
					onChange={addPlayerD}
					onClear={clearPlayerD}
					playerInfo={playerD}
				/> : null}
			</div>
		</div>
		{renderMatchResults()}
	</div>;

};
