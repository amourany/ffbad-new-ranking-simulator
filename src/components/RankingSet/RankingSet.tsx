import { RankingTile } from '@components/RankingTile/RankingTile';
import styles from './RankingSet.module.css';
import { useTranslation } from '@hooks/useTranslation';

export type RankingSetProps = {
	singleRate: number;
	singleSubLevel: string;
	doubleRate: number;
	doubleSubLevel: string;
	mixedRate: number;
	mixedSubLevel: string;
};

export const RankingSet = ({ singleRate, singleSubLevel, doubleRate, doubleSubLevel, mixedRate, mixedSubLevel }: RankingSetProps) => {
	const { t } = useTranslation({ keyPrefix: 'RANKING_SET' });

	return (
		<div className={styles.container}>
			<RankingTile
				discipline={t('SINGLE')}
				rankingRate={singleRate}
				rankingSubLevel={singleSubLevel}
			/>
			<RankingTile
				discipline={t('DOUBLES')}
				rankingRate={doubleRate}
				rankingSubLevel={doubleSubLevel}
			/>
			<RankingTile
				discipline={t('MIXED')}
				rankingRate={mixedRate}
				rankingSubLevel={mixedSubLevel}
			/>
		</div>
	);
};
