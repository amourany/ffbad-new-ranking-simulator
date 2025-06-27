import { Accordion } from '@mantine/core';
import {
	IconAbacus,
	IconCalendarOff,
	IconChartBar,
	IconGenderBigender,
	IconInfoCircleFilled,
	IconPlusMinus,
	IconRefresh,
	IconUsers,
} from '@tabler/icons-react';
import { useTranslation } from '@hooks/useTranslation';
import styles from './RankingExplanation.module.css';

export const RankingExplanation = () => {
	const { t } = useTranslation({ keyPrefix: 'RANKING_EXPLANATION' });

	return (
		<Accordion
			className={styles.accordion}
			variant="separated"
		>
			<Accordion.Item value="info">
				<Accordion.Control icon={<IconInfoCircleFilled color="cornflowerblue"/>}>
					<div className={styles.control}>
						<span>{t('TITLE_PART_1')}</span>
						<span>{t('TITLE_PART_2')}</span>
					</div>
				</Accordion.Control>
				<Accordion.Panel className={styles.content}>
					<p>{t('INTRODUCTION')}</p>
					<div>
						<div className={styles.subTitle}>
							<IconPlusMinus className={styles.icon}/>
							<span>{t('TITLE_1')}</span>
						</div>
						<p className={styles.description}>{t('DESCRIPTION_1')}</p>
					</div>
					<div>
						<div className={styles.subTitle}>
							<IconAbacus className={styles.icon}/>
							<span>{t('TITLE_2')}</span>
						</div>
						<p className={styles.description}>{t('DESCRIPTION_2')}</p>
					</div>
					<div>
						<div className={styles.subTitle}>
							<IconUsers className={styles.icon}/>
							<span>{t('TITLE_3')}</span>
						</div>
						<p className={styles.description}>{t('DESCRIPTION_3')}</p>
					</div>
					<div>
						<div className={styles.subTitle}>
							<IconChartBar className={styles.icon}/>
							<span>{t('TITLE_4')}</span>
						</div>
						<p className={styles.description}>{t('DESCRIPTION_4')}</p>
					</div>
					<div>
						<div className={styles.subTitle}>
							<IconCalendarOff className={styles.icon}/>
							<span>{t('TITLE_5')}</span>
						</div>
						<p className={styles.description}>{t('DESCRIPTION_5')}</p>
					</div>
					<div>
						<div className={styles.subTitle}>
							<IconRefresh className={styles.icon}/>
							<span>{t('TITLE_6')}</span>
						</div>
						<p className={styles.description}>{t('DESCRIPTION_6')}</p>
					</div>
					<div>
						<div className={styles.subTitle}>
							<IconGenderBigender className={styles.icon}/>
							<span>{t('TITLE_7')}</span>
						</div>
						<p className={styles.description}>{t('DESCRIPTION_7')}</p>
					</div>
					<p className={styles.playlist}>
						{t('FFBAD_PLAYLIST_TITLE')}
						<a href="https://youtube.com/playlist?list=PLE-Y2Ueg1p2j4GLTgAyCax5GQIN7KNJWJ&si=iBwTvo6lmtg1eJdz">{t('FFBAD_PLAYLIST_LINK')}</a>
					</p>
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	);
};
