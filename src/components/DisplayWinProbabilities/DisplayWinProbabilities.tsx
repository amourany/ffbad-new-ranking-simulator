import { useTranslation } from '@hooks/useTranslation';
import styles from './DisplayWinProbabilities.module.css';

export type DisplayWinProbabilitiesProps = {
	probabilities: number;
	variant?: 'small' | 'large';
};

export const DisplayWinProbabilities = ({ probabilities, variant = 'small' }: DisplayWinProbabilitiesProps) => {
	const { t } = useTranslation({ keyPrefix: 'DISPLAY_WIN_PROBABILITIES' });
	return <span className={styles.label}>
		{variant === 'small' ? t('SHORT_LABEL', { value: probabilities }): t('LABEL', { value: probabilities })}
	</span>;
};