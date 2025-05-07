import { useTranslation } from '@hooks/useTranslation';
import { InputWrapper, SegmentedControl } from '@mantine/core';
import styles from './CrossGenderMatchSelect.module.css';

export type CrossGenderMatchSelectProps = {
	onChange: (isCrossGenderMatch: boolean) => void
};

export const CrossGenderMatchSelect = ({ onChange }: CrossGenderMatchSelectProps) => {
	const { t } = useTranslation({ keyPrefix: 'MATCH_CONFIGURATION' });

	return (
		<div className={styles.container}>

			<InputWrapper
				className={styles.wrapper}
				label={t('DOUBLE_MATCH_TYPE')}
			>
				<SegmentedControl
					data={[
						{ label: t('MIXED_DOUBLE'),
							value: 'false' },
						{ label: t('CROSS_GENDER_DOUBLE'),
							value: 'true' },
					]}
					onChange={(value) => onChange(value === 'true')}
				/>
			</InputWrapper>
		</div>
	);
};
