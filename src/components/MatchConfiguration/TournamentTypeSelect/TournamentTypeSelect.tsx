import { TFunction } from 'i18next';
import { ComboboxData, Select } from '@mantine/core';
import { useTranslation } from '@hooks/useTranslation';
import styles from './TournamentTypeSelect.module.css';

const matchFactorsTable = (t: TFunction): ComboboxData => [
	{ label: t('FRENCH_CHAMPIONSHIP'),
		value: '1.5' },
	{ label: t('REGIONAL_CHAMPIONSHIP'),
		value: '1.4' },
	{ label: t('DISTRICT_CHAMPIONSHIP'),
		value: '1.3' },
	{ label: t('NATIONAL_TROPHY'),
		value: '1.30' },
	{ label: t('REGIONAL_TROPHY'),
		value: '1.2' },
	{ label: t('DISTRICT_TROPHY'),
		value: '1.1' },
	{ label: t('PROMOBAD_TOURNAMENT'),
		value: '0.2' },
	{ label: t('TOURNAMENT'),
		value: '1' },
	{ label: t('UNOFFICIAL_TOURNAMENT'),
		value: '0' },
];

export type TournamentTypeSelectProps = {
	onChange: (factor: number) => void
};

export const TournamentTypeSelect = ({ onChange }: TournamentTypeSelectProps) => {
	const { t } = useTranslation({ keyPrefix: 'MATCH_CONFIGURATION' });

	return (<Select
		allowDeselect={false}
		className={styles.select}
		data={matchFactorsTable(t)}
		defaultValue="1"
		label={t('LABEL')}
		onChange={(value) => onChange(Number(value))}
	/>);
};
