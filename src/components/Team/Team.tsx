import { PlayerInMatch } from '@components/PlayerInMatch/PlayerInMatch';
import styles from './Team.module.css';

export type TeamProps = {
	isDoublesMatch: boolean,
	licenceA: number | undefined,
	playerALabel: string,
	onPlayerAChange: (licence:number) => void
	onPlayerAClear: () => void
	licenceB?: number | undefined,
	playerBLabel?: string,
	onPlayerBChange?: (licence:number) => void
	onPlayerBClear?: () => void
};

export const Team = ({ isDoublesMatch, licenceA, playerALabel, onPlayerAChange, onPlayerAClear, licenceB, playerBLabel, onPlayerBChange, onPlayerBClear }:TeamProps) => (<div className={styles.team} >
	<PlayerInMatch
		label={playerALabel}
		licence={licenceA}
		onChange={onPlayerAChange}
		onClear={onPlayerAClear}
	/>
	{isDoublesMatch ? <PlayerInMatch
		label={playerBLabel!}
		licence={licenceB}
		onChange={onPlayerBChange!}
		onClear={onPlayerBClear!}
	/> : null}
</div>);
