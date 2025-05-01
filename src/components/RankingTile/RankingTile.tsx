import styles from './RankingTile.module.css';

export type RankingTileProps = {
	rankingSubLevel: string;
	rankingRate: number;
};

export const RankingTile = ({ rankingSubLevel, rankingRate }: RankingTileProps) => (
	<div className={styles.tile}>
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
