import { SearchPlayerInput } from '@components/SearchPlayerInput/SearchPlayerInput';
import { PlayerInfo, useFetchPlayerRankings } from '@api/player-ranking/useFetchPlayerRankings';
import { DisplayPlayerRankings } from '@components/DisplayPlayerRankings/DisplayPlayerRankings';
import { useTranslation } from '@hooks/useTranslation';
import styles from './PlayerInMatch.module.css';
import { useState } from 'react';

export type PlayerInMatchProps = {
	label: string;
	licence?: number;
	onChange: (licence: number) => void;
	onClear: () => void;
};

export const PlayerInMatch = ({ licence, label, onChange, onClear }: PlayerInMatchProps) => {
	const { t } = useTranslation({ keyPrefix: 'PLAYER_IN_MATCH' });
	const [
		playerLicence,
		setPlayerLicence,
	] = useState<number|undefined>(licence ?? undefined);

	const { data: playerInfo, isLoading } = useFetchPlayerRankings(playerLicence);

	const handleOnChange = (licence: number) => {
		setPlayerLicence(licence);
		onChange(licence);
	};

	const handleOnClear = () => {
		setPlayerLicence(undefined);
		onClear();
	};

	const renderPlayerInfo = (playerInfo: PlayerInfo) => <DisplayPlayerRankings
		onClear={handleOnClear}
		playerInfo={playerInfo}
	/>;

	const renderSearchInput = () => <div className={styles.searchPlayer}>
		<SearchPlayerInput
			label={label}
			onChange={handleOnChange}
		/>
	</div>;

	return (
		<>
			{playerInfo ? renderPlayerInfo(playerInfo) : renderSearchInput()}
			{isLoading ? <div>{t('LOADING')}</div> : null}
		</>
	);
};
