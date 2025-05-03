import { RankingTile } from '@components/RankingTile/RankingTile';
import styles from './RankingSet.module.css';
import { useTranslation } from '@hooks/useTranslation';

export const RANKING_SET_SMALL_VARIANT = 'small';
export const RANKING_SET_LARGE_VARIANT = 'large';
export type RankingSetVariant = typeof RANKING_SET_SMALL_VARIANT | typeof RANKING_SET_LARGE_VARIANT;

export type RankingSetProps = {
	singleRate: number;
	singleSubLevel: string;
	doubleRate: number;
	doubleSubLevel: string;
	mixedRate: number;
	mixedSubLevel: string;
	variant?: RankingSetVariant;
};

export const RankingSet = ({
	singleRate,
	singleSubLevel,
	doubleRate,
	doubleSubLevel,
	mixedRate,
	mixedSubLevel,
	variant = RANKING_SET_LARGE_VARIANT,
}: RankingSetProps) => {
	const { t } = useTranslation({ keyPrefix: 'RANKING_SET' });
	return (
		<div className={[
			styles.container,
			styles[variant],
		].join(' ')}
		>
			<RankingTile
				discipline={variant == RANKING_SET_LARGE_VARIANT ? t('SINGLE') : undefined}
				rankingRate={singleRate}
				rankingSubLevel={singleSubLevel}
				variant={variant}
			/>
			<RankingTile
				discipline={variant == RANKING_SET_LARGE_VARIANT ? t('DOUBLES') : undefined}
				rankingRate={doubleRate}
				rankingSubLevel={doubleSubLevel}
				variant={variant}
			/>
			<RankingTile
				discipline={variant == RANKING_SET_LARGE_VARIANT ? t('MIXED') : undefined}
				rankingRate={mixedRate}
				rankingSubLevel={mixedSubLevel}
				variant={variant}
			/>
		</div>);
};
