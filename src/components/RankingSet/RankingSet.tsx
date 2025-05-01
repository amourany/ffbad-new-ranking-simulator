import { RankingTile } from '@components/RankingTile/RankingTile';
import styles from './RankingSet.module.css';

export type RankingSetProps = {
	singleRate: number;
	singleSubLevel: string;
	doubleRate: number;
	doubleSubLevel: string;
	mixedRate: number;
	mixedSubLevel: string;
};

export const RankingSet = ({ singleRate, singleSubLevel, doubleRate, doubleSubLevel, mixedRate, mixedSubLevel }: RankingSetProps) => (
	<div className={styles.container}>
		<RankingTile
			rankingRate={singleRate}
			rankingSubLevel={singleSubLevel}
		/>
		<RankingTile
			rankingRate={doubleRate}
			rankingSubLevel={doubleSubLevel}
		/>
		<RankingTile
			rankingRate={mixedRate}
			rankingSubLevel={mixedSubLevel}
		/>
	</div>
);
