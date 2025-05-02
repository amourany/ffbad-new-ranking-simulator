import { PlayerInfo } from '@api/player-ranking/useFetchPlayersRankings';
import { useTranslation } from '@hooks/useTranslation';
import { useDateFormat } from '@hooks/useFormatDate';
import { RankingSet } from '@components/RankingSet/RankingSet';
import styles from './DisplayNewRankings.module.css';
import { IconArrowRight } from '@tabler/icons-react';

export type DisplayNewRankingsProps = {
	playerInfo: PlayerInfo;
};

export const DisplayNewRankings = ({ playerInfo }: DisplayNewRankingsProps) => {

	const { t } = useTranslation({ keyPrefix: 'DISPLAY_NEW_RANKINGS' });
	const { formatDate } = useDateFormat();

	return (
		<div>
			<p className={styles.rankingDate}>
				{t('RANKING_DATE')}
				{' '}
				:
				{' '}
				{formatDate(playerInfo.rankingDate)}
			</p>
			<p className={styles.player}>
				{playerInfo.name}
			</p>
			<div className={styles.container}>

				<div className={styles.tileContainer}>
					<p className={styles.title}>{t('CURRENT_RANKINGS')}</p>
					<RankingSet
						doubleRate={playerInfo.rankings.doubleRate}
						doubleSubLevel={playerInfo.rankings.doubleSubLevel}
						mixedRate={playerInfo.rankings.mixedRate}
						mixedSubLevel={playerInfo.rankings.mixedSubLevel}
						singleRate={playerInfo.rankings.singleRate}
						singleSubLevel={playerInfo.rankings.singleSubLevel}
					/>
				</div>
				<IconArrowRight className={styles.icon} />
				<div className={styles.tileContainer}>
					<p className={styles.title}>{t('NEW_RANKINGS')}</p>
					<RankingSet
						doubleRate={playerInfo.convertedRankings.doubleRate}
						doubleSubLevel={playerInfo.rankings.doubleSubLevel}
						mixedRate={playerInfo.convertedRankings.mixedRate}
						mixedSubLevel={playerInfo.rankings.mixedSubLevel}
						singleRate={playerInfo.convertedRankings.singleRate}
						singleSubLevel={playerInfo.rankings.singleSubLevel}
					/>
				</div>
			</div>
		</div>
	);
};
