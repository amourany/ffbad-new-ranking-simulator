import { ComboboxData, Select } from '@mantine/core';
import { useTranslation } from '@hooks/useTranslation';
import { TFunction } from 'i18next';
import styles from './MatchConfiguration.module.css';

export type MatchConfigurationProps = {
	onChange: (factor: number) => void
};

export const matchFactorsTable = (t: TFunction): ComboboxData => [
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

export const MatchConfiguration = ({ onChange }: MatchConfigurationProps) => {

	const { t } = useTranslation({ keyPrefix: 'MATCH_CONFIGURATION' });

	return (<div>
		<h2>{t('TITLE')}</h2>
		<Select
			className={styles.select}
			data={matchFactorsTable(t)}
			defaultValue="1"
			label={t('LABEL')}
			onChange={(value) => onChange(Number(value))}
		/>
	</div>
	);
};
