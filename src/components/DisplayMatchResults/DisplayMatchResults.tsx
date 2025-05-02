import { PlayerInfo } from '@api/player-ranking/useFetchPlayersRankings';
import { simulateMatch } from '@engine/simulate-match';
import { MatchOutcome } from '@components/MatchOutcome/MatchOutcome';
import { useTranslation } from '@hooks/useTranslation';
import styles from './DisplayMatchResults.module.css';

export type DisplayMatchResultsProps = {
	playerInfoMe: PlayerInfo;
	playerInfoOpponent: PlayerInfo;
};

export const DisplayMatchResults = ({ playerInfoMe, playerInfoOpponent }: DisplayMatchResultsProps) => {

	const { t } = useTranslation({ keyPrefix: 'DISPLAY_MATCH_RESULTS' });

	const singleRankingMe = playerInfoMe.convertedRankings.singleRate;
	const singleRankingOpponent = playerInfoOpponent.convertedRankings.singleRate;
	const matchResult = simulateMatch(singleRankingMe, singleRankingOpponent);
	return (
		<div className={styles.outcomes}>
			<MatchOutcome
				label={t('LABEL', { value: playerInfoMe.name })}
				playerAName={playerInfoMe.name}
				playerAOutcome={matchResult[0].wins}
				playerBName={playerInfoOpponent.name}
				playerBOutcome={matchResult[0].losses}
				rankingPlayerA={singleRankingMe}
				rankingPlayerB={singleRankingOpponent}
			/>
			<MatchOutcome
				label={t('LABEL', { value: playerInfoOpponent.name })}
				playerAName={playerInfoMe.name}
				playerAOutcome={matchResult[1].losses}
				playerBName={playerInfoOpponent.name}
				playerBOutcome={matchResult[1].wins}
				rankingPlayerA={singleRankingMe}
				rankingPlayerB={singleRankingOpponent}
			/>
		</div>
	);
};
