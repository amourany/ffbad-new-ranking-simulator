import styles from './RankingTile.module.css';

export type RankingTileProps = {
	discipline: string;
	rankingSubLevel: string;
	rankingRate: number;
};

export const RankingTile = ({ discipline, rankingSubLevel, rankingRate }: RankingTileProps) => (
	<div className={styles.tile}>
		<label className={styles.discipline}>{discipline}</label>
		<div className={[
			styles.subLevelContainer,
			styles[rankingSubLevel],
		].join(' ')}
		>
			<div className={styles.subLevel}>{rankingSubLevel}</div>
		</div>
		<div className={styles.ranking}>{rankingRate}</div>
	</div>
);
