import { useTranslation } from '@hooks/useTranslation';
import { TournamentTypeSelect } from '@components/MatchConfiguration/TournamentTypeSelect/TournamentTypeSelect';
import styles from './MatchConfiguration.module.css';
import { CrossGenderMatchSelect } from '@components/MatchConfiguration/CrossGenderMatchSelect/CrossGenderMatchSelect';

export type MatchConfigurationProps = {
	onTournamentTypeChange: (factor: number) => void
	onMatchTypeChange: (isCrossGender: boolean) => void
	isMixedDoublesMatch: boolean
};

export const MatchConfiguration = ({ onTournamentTypeChange, onMatchTypeChange, isMixedDoublesMatch }: MatchConfigurationProps) => {

	const { t } = useTranslation({ keyPrefix: 'MATCH_CONFIGURATION' });

	return (<div>
		<h2>{t('TITLE')}</h2>
		<div className={styles.inputs}>
			<TournamentTypeSelect onChange={onTournamentTypeChange} />
			{isMixedDoublesMatch ? <CrossGenderMatchSelect onChange={onMatchTypeChange}/> : null}
		</div>
	</div>
	);
};
