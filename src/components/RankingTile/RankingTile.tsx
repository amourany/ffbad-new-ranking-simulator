import styles from './RankingTile.module.css';
import {
	RANKING_SET_LARGE_VARIANT,
	RANKING_SET_SMALL_VARIANT,
	RankingSetVariant,
} from '@components/RankingSet/RankingSet';

export type RankingTileProps = {
	discipline?: string;
	rankingSubLevel: string;
	rankingRate: number;
	variant?: RankingSetVariant
};

export const RankingTile = ({ discipline, rankingSubLevel, rankingRate, variant = RANKING_SET_LARGE_VARIANT }: RankingTileProps) => (
	<div className={[
		styles.tile,
		styles[variant],
	].join(' ')}
	>
		{discipline ? <label className={styles.discipline}>{discipline}</label> : null}
		<div className={[
			styles.subLevelContainer,
			styles[rankingSubLevel],
			styles[variant],
		].join(' ')}
		>
			<div className={styles.subLevel}>{rankingSubLevel}</div>
			{variant === RANKING_SET_SMALL_VARIANT ? <div className={[
				styles.ranking,
				styles[variant],
			].join(' ')}
			>
				{rankingRate}
			</div> : null}
		</div>
		{variant === RANKING_SET_LARGE_VARIANT ? <div className={[
			styles.ranking,
			styles[variant],
		].join(' ')}
		>
			{rankingRate}
		</div> : null}
	</div>
);
