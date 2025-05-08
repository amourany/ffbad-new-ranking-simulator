import { ReactElement, useState } from 'react';
import { Button } from '@mantine/core';
import { useFetchPlayerRankings } from '@api/player-ranking/useFetchPlayerRankings';
import styles from './MatchSimulatorPage.module.css';
import { useTranslation } from '@hooks/useTranslation';
import { useNavigate } from '@tanstack/react-router';
import { Route, SimulateRouteSearch } from '@routes/simulate';
import { IconUsersMinus, IconUsersPlus } from '@tabler/icons-react';
import { isMixedDoublesTeam } from '@engine/simulation/simulate-match';
import { MatchConfiguration } from '@components/MatchConfiguration/MatchConfiguration';
import { Title } from '@components/Title/Title';
import { Team } from '@components/Team/Team';
import { MatchSimulation } from '@components/MatchSimulation/MatchSimulation';

const PLAYER_A_INDEX = 0;
const PLAYER_B_INDEX = 1;
const PLAYER_C_INDEX = 2;
const PLAYER_D_INDEX = 3;

const searchParamOrder:string[] = [
	'playerA',
	'playerB',
	'playerC',
	'playerD',
];

export const MatchSimulatorPage = () => {

	const { playerA: playerALicence, playerB: playerBLicence, playerC: playerCLicence, playerD: playerDLicence } = Route.useSearch();
	const { t } = useTranslation({ keyPrefix: 'MATCH_SIMULATOR_PAGE' });
	const [
		playerLicences,
		setPlayerLicences,
	] = useState<(number|undefined)[]>([
		playerALicence,
		playerBLicence,
		playerCLicence,
		playerDLicence,
	]);
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

	const addPlayer = (index:number) => async (licence: number) => {
		setPlayerLicences([
			...playerLicences.slice(0, index),
			licence,
			...playerLicences.slice(index + 1),
		]);
		const params = new Map<string, number>([
			[
				searchParamOrder[index],
				licence,
			],
		]);
		await addUrlSearchParam(Object.fromEntries(params));
	};

	const clearPlayer = (index:number) => async () => {
		setPlayerLicences([
			...playerLicences.slice(0, index),
			undefined,
			...playerLicences.slice(index + 1),
		]);
		const params = new Map<string, undefined>([
			[
				searchParamOrder[index],
				undefined,
			],
		]);
		await addUrlSearchParam(Object.fromEntries(params));
	};

	const { data:playerA } = useFetchPlayerRankings(playerLicences[PLAYER_A_INDEX]);
	const { data:playerB } = useFetchPlayerRankings(playerLicences[PLAYER_B_INDEX]);
	const { data:playerC } = useFetchPlayerRankings(playerLicences[PLAYER_C_INDEX]);
	const { data:playerD } = useFetchPlayerRankings(playerLicences[PLAYER_D_INDEX]);

	const isMixedDoubles = isMixedDoublesTeam(playerA?.gender, playerC?.gender) && isMixedDoublesTeam(playerB?.gender, playerD?.gender);

	const switchMatchType = async () => {
		setIsDoublesMatch(!isDoublesMatch);
		await clearPlayer(PLAYER_C_INDEX)();
		await clearPlayer(PLAYER_D_INDEX)();
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
			<Team
				isDoublesMatch={isDoublesMatch}
				licenceA={playerLicences[PLAYER_A_INDEX]}
				licenceB={playerLicences[PLAYER_C_INDEX]}
				onPlayerAChange={addPlayer(PLAYER_A_INDEX)}
				onPlayerAClear={clearPlayer(PLAYER_A_INDEX)}
				onPlayerBChange={addPlayer(PLAYER_C_INDEX)}
				onPlayerBClear={clearPlayer(PLAYER_C_INDEX)}
				playerALabel={t('PLAYER_A')}
				playerBLabel={t('PLAYER_C')}
			/>
			<div className={styles.versus}>{t('VS')}</div>
			<Team
				isDoublesMatch={isDoublesMatch}
				licenceA={playerLicences[PLAYER_B_INDEX]}
				licenceB={playerLicences[PLAYER_D_INDEX]}
				onPlayerAChange={addPlayer(PLAYER_B_INDEX)}
				onPlayerAClear={clearPlayer(PLAYER_B_INDEX)}
				onPlayerBChange={addPlayer(PLAYER_D_INDEX)}
				onPlayerBClear={clearPlayer(PLAYER_D_INDEX)}
				playerALabel={t('PLAYER_B')}
				playerBLabel={t('PLAYER_D')}
			/>
		</div>
		<div className={styles.configuration}>
			<MatchConfiguration
				isMixedDoublesMatch={isMixedDoubles}
				onMatchTypeChange={setIsCrossGenderMatch}
				onTournamentTypeChange={setMatchMultiplyingFactor}
			/>
		</div>
		<MatchSimulation
			matchConfiguration={{
				isCrossGenderMatch,
				isDoublesMatch,
				isMixedDoubles,
				matchMultiplyingFactor,
			}}
			playerALicence={playerLicences[PLAYER_A_INDEX]}
			playerBLicence={playerLicences[PLAYER_B_INDEX]}
			playerCLicence={playerLicences[PLAYER_C_INDEX]}
			playerDLicence={playerLicences[PLAYER_D_INDEX]}
		/>
	</div>;

};
