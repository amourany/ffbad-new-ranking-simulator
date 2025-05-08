import { Stack } from '@mantine/core';
import { useState } from 'react';
import { useFetchPlayerRankings } from '@api/player-ranking/useFetchPlayerRankings';
import { DisplayNewRankings } from '@components/DisplayNewRankings/DisplayNewRankings';
import styles from './ConverterPage.module.css';
import { SearchPlayerInput } from '@components/SearchPlayerInput/SearchPlayerInput';
import { useTranslation } from '@hooks/useTranslation';
import { Title } from '@components/Title/Title';

export const ConverterPage = () => {

	const { t } = useTranslation({ keyPrefix: 'CONVERT_PAGE' });
	const [
		licence,
		setLicence,
	] = useState<number|undefined>(undefined);
	const { data, isLoading } = useFetchPlayerRankings(licence);

	return (
		<div>
			<Stack
				classNames={{
					root: styles.stack,
				}}
			>
				<Title label={t('TITLE')} />
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
