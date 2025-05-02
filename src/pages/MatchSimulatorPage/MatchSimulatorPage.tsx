import { useState } from 'react';
import { Divider } from '@mantine/core';
import { PlayerInMatch } from '@components/PlayerInMatch/PlayerInMatch';
import { PlayerInfo, PlayerLicences, useFetchPlayersRankings } from '@api/player-ranking/useFetchPlayersRankings';
import { UseQueryResult } from '@tanstack/react-query';
import { DisplayMatchResults } from '@components/DisplayMatchResults/DisplayMatchResults';
import styles from './MatchSimulatorPage.module.css';
import { useTranslation } from '@hooks/useTranslation';
import { useNavigate } from '@tanstack/react-router';
import { Route, SimulateRouteSearch } from '@routes/simulate';

export const MatchSimulatorPage = () => {

	const { playerA, playerB } = Route.useSearch();
	const { t } = useTranslation({ keyPrefix: 'MATCH_SIMULATOR_PAGE' });
	const [
		playerLicences,
		setPlayerLicences,
	] = useState<PlayerLicences>({ me: playerA,
		opponent: playerB });
	const fetchedPlayers = useFetchPlayersRankings(playerLicences);
	const navigate = useNavigate({ from: Route.fullPath });

	const addMe = (licence: number) => {
		setPlayerLicences({ ...playerLicences,
			me: licence });
		navigate({ search: (previousSearch: SimulateRouteSearch) => ({ ...previousSearch,
			playerA: licence }) });
	};
	const addOpponent = (licence: number) => {
		setPlayerLicences({ ...playerLicences,
			opponent: licence });
		navigate({ search: (previousSearch: SimulateRouteSearch) => ({ ...previousSearch,
			playerB: licence }) });
	};

	const clearPlayerA = () => {
		setPlayerLicences({ ...playerLicences,
			me: undefined });
		navigate({ search: (previousSearch: SimulateRouteSearch) => ({ ...previousSearch,
			playerA: undefined }) });
	};
	const clearPlayerB = () => {
		setPlayerLicences({ ...playerLicences,
			opponent: undefined });
		navigate({ search: (previousSearch: SimulateRouteSearch) => ({ ...previousSearch,
			playerB: undefined }) });
	};

	const me = fetchedPlayers.find(item => item[0] === 'me')?.[1] as UseQueryResult<PlayerInfo>;
	const opponent = fetchedPlayers.find(item => item[0] === 'opponent')?.[1] as UseQueryResult<PlayerInfo>;

	return <div className={styles.container}>
		<div className={styles.playerInputsContainer}>
			<PlayerInMatch
				isLoading={me?.isLoading ?? false}
				label={t('PLAYER_A')}
				onChange={addMe}
				onClear={clearPlayerA}
				playerInfo={me?.data}
			/>
			<div className={styles.versus}>{t('VS')}</div>
			<PlayerInMatch
				isLoading={opponent?.isLoading ?? false}
				label={t('PLAYER_B')}
				onChange={addOpponent}
				onClear={clearPlayerB}
				playerInfo={opponent?.data}
			/>
		</div>
		<Divider/>
		{me?.data && opponent?.data ? <DisplayMatchResults
			playerInfoMe={me.data}
			playerInfoOpponent={opponent.data}
		/> : null}
	</div>;

};
