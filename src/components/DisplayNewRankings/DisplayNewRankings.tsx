import { PlayerInfo } from '@api/player-ranking/useFetchPlayerRankings';
import { useConvertRankings } from '@hooks/useConvertRankings';
import { useMemo } from 'react';
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

	const conversionFunctions = useConvertRankings(playerInfo.gender);

	const singleRanking = useMemo(() => conversionFunctions.convertSingle(playerInfo), [
		conversionFunctions,
		playerInfo,
	]);
	const doubleRanking = useMemo(() => conversionFunctions.convertDouble(playerInfo), [
		conversionFunctions,
		playerInfo,
	]);
	const mixedRanking = useMemo(() => conversionFunctions.convertMixed(playerInfo), [
		conversionFunctions,
		playerInfo,
	]);

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
				{playerInfo.firstName}
				{' '}
				{playerInfo.lastName}
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
						doubleRate={doubleRanking}
						doubleSubLevel={playerInfo.rankings.doubleSubLevel}
						mixedRate={mixedRanking}
						mixedSubLevel={playerInfo.rankings.mixedSubLevel}
						singleRate={singleRanking}
						singleSubLevel={playerInfo.rankings.singleSubLevel}
					/>
				</div>
			</div>
		</div>
	);
};
