import { BFFMedal, BFFPlayer } from '@api/search-tournaments/useSearchTournaments';
import styles from './TournamentMedals.module.css';

export type TournamentMedalsProps = {
	title: string;
	medals: BFFMedal[];
	club: string;
};

const sortMedals = (a: BFFMedal, b: BFFMedal) => a.seriesName.localeCompare(b.seriesName);

const renderPlayerLabel = (player: BFFPlayer| undefined, clubName: string) => {
	if(!player) {
		return null;
	}
	return <div className={styles.player}>
		<span>{player.name}</span>
		{player.club !== clubName ? <span className={styles.clubName}>{`(${player.club})`}</span>: null}
	</div>;
};

export const TournamentMedals = ({ title, medals, club: clubName }: TournamentMedalsProps) => medals.length > 0 ? <div>
	<div className={styles.seriesTitle}>{title}</div>
	{medals.sort(sortMedals)
		.map(medal => {
			const playerALabel = renderPlayerLabel(medal.playerA, clubName);
			const playerBLabel = renderPlayerLabel(medal.playerB, clubName);

			const playersLabel = playerBLabel ? <div className={styles.players}>
				{playerALabel}
				{'-'}
				{playerBLabel}
			</div> : <div className={styles.players}>{playerALabel}</div>;

			return <div
				className={styles.series}
				key={medal.seriesId}
			>
				<span className={styles.seriesName}>{`${medal.seriesName} :`}</span>
				{playersLabel}
			</div>;
		})}
</div> : null;