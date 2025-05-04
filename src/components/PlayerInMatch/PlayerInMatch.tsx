import { SearchPlayerInput } from '@components/SearchPlayerInput/SearchPlayerInput';
import { PlayerInfo } from '@api/player-ranking/useFetchPlayersRankings';
import { DisplayPlayerRankings } from '@components/DisplayPlayerRankings/DisplayPlayerRankings';
import { useTranslation } from '@hooks/useTranslation';
import styles from './PlayerInMatch.module.css';

export type PlayerInMatchProps = {
	label: string;
	isLoading: boolean;
	playerInfo: PlayerInfo | undefined;
	onChange: (licence: number) => void;
	onClear: () => void;
};

export const PlayerInMatch = ({ label, isLoading, playerInfo, onChange, onClear }: PlayerInMatchProps) => {
	const { t } = useTranslation({ keyPrefix: 'PLAYER_IN_MATCH' });

	const renderPlayerInfo = (playerInfo: PlayerInfo) => <DisplayPlayerRankings
		onClear={onClear}
		playerInfo={playerInfo}
	/>;

	const renderSearchInput = () => <div className={styles.searchPlayer}>
		<SearchPlayerInput
			label={label}
			onChange={onChange}
		/>
	</div>;

	return (
		<>
			{playerInfo ? renderPlayerInfo(playerInfo) : renderSearchInput()}
			{isLoading ? <div>{t('LOADING')}</div> : null}
		</>
	);
};
