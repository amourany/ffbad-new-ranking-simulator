import { Stack } from '@mantine/core';
import { useState } from 'react';
import { PlayerInfo, useFetchPlayersRankings } from '@api/player-ranking/useFetchPlayersRankings';
import { DisplayNewRankings } from '@components/DisplayNewRankings/DisplayNewRankings';
import styles from './ConverterPage.module.css';
import { UseQueryResult } from '@tanstack/react-query';
import { SearchPlayerInput } from '@components/SearchPlayerInput/SearchPlayerInput';
import { useTranslation } from '@hooks/useTranslation';

export const ConverterPage = () => {

	const { t } = useTranslation({ keyPrefix: 'CONVERT_PAGE' });
	const [
		licence,
		setLicence,
	] = useState<number|undefined>(undefined);
	const players = useFetchPlayersRankings({ playerA: licence });
	const { data, isLoading } = players.find(item => item[0] === 'playerA')?.[1] as UseQueryResult<PlayerInfo>;

	return (
		<div>
			<Stack
				classNames={{
					root: styles.stack,
				}}
			>
				<h1 className={styles.title}>{t('TITLE')}</h1>
				{data ? <DisplayNewRankings
					onClear={() => setLicence(undefined)}
					playerInfo={data}
				/> :
					<SearchPlayerInput
						label={t('INPUT_LABEL')}
						onChange={setLicence}
					/>}
				{isLoading ? <div>{t('LOADING')}</div> : null}
			</Stack>
		</div>
	);
};
