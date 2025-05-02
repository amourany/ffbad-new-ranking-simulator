import { PlayerInfo } from '@api/player-ranking/useFetchPlayersRankings';
import { RankingSet } from '@components/RankingSet/RankingSet';
import styles from './DisplayPlayerRankings.module.css';
import { ActionIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

export type DisplayPlayerRankingsProps = {
	playerInfo: PlayerInfo;
	onClear: () => void;
};

export const DisplayPlayerRankings = ({ playerInfo, onClear }: DisplayPlayerRankingsProps) => <div className={styles.container}>
	<div className={styles.playerInfoContainer}>
		<p>{playerInfo.name}</p>
		<ActionIcon
			aria-label="Clear"
			color="black"
			onClick={onClear}
			size="xs"
			variant="transparent"
		>
			<IconX/>
		</ActionIcon>
	</div>
	<div className={styles.rankingContainer}>
		<RankingSet
			doubleRate={playerInfo.convertedRankings.doubleRate}
			doubleSubLevel={playerInfo.rankings.doubleSubLevel}
			mixedRate={playerInfo.convertedRankings.mixedRate}
			mixedSubLevel={playerInfo.rankings.mixedSubLevel}
			singleRate={playerInfo.convertedRankings.singleRate}
			singleSubLevel={playerInfo.rankings.singleSubLevel}
		/>
	</div>
</div>;
