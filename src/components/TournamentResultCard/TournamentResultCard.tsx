import {
	IconLaurelWreath,
	IconPentagonNumber1,
	IconPentagonNumber2,
	IconPentagonNumber3,
} from '@tabler/icons-react';
import { BFFMedals } from '@api/search-tournaments/useSearchTournaments';
import styles from './TournamentResultCard.module.css';
import { TournamentMedals } from '@components/TournamentMedals/TournamentMedals';
import dayjs from 'dayjs';
import { useTranslation } from '@hooks/useTranslation';
import { Divider, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useDateFormat } from '@hooks/useFormatDate';
import { PlayersInTournament } from '@components/PlayersInTournament/PlayersInTournament';

export type TournamentCardProps = {
	tournamentName: string;
	city: string;
	firstDay: number;
	lastDay: number;
	playerCount: number;
	playerNames: string[];
	medals: BFFMedals;
	club: string;
};


export const TournamentResultCard = ({ tournamentName, city, firstDay, lastDay, playerCount, playerNames, medals, club }: TournamentCardProps) => {

	const { t } = useTranslation({ keyPrefix: 'TOURNAMENT_RESULT_CARD' });
	const { formatDateSmall } = useDateFormat();

	const theme = useMantineTheme();
	const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`, true);

	const firstDayLabel = formatDateSmall(dayjs.unix(firstDay).toDate());
	const lastDayLabel = formatDateSmall(dayjs.unix(lastDay).toDate());
	const isSameDay = dayjs.unix(firstDay).isSame(dayjs.unix(lastDay), 'day');

	const areMedalsWon = medals.gold.length > 0 || medals.silver.length > 0 || medals.bronze.length > 0;

	const renderEmptyStatePodium = () => <div className={styles.emptyStateContainer}>
		<IconLaurelWreath />
		{t('EMPTY_PODIUM')}
	</div>;

	const renderMobileView = () => <div className={styles.cardHeader}>
		<div className={styles.row}>
			<div className={styles.title}>
				<span className={styles.tournamentName}>{tournamentName}</span>
				<PlayersInTournament
					playerCount={playerCount}
					playerNames={playerNames}
				/>
			</div>
		</div>
		<div className={styles.row}>
			<span className={styles.subTitle}>{city}</span>
			<span className={styles.subTitle}>
				{isSameDay ? firstDayLabel : `${firstDayLabel} - ${lastDayLabel}`}
			</span>
		</div>
		{areMedalsWon ? <div className={styles.row}>
			<div className={styles.icons}>
				<div className={styles.icon}>
					<IconPentagonNumber1
						className={styles.gold}
					/>
					<span>{medals.gold.length}</span>
				</div>
				<div className={styles.icon}>
					<IconPentagonNumber2 className={styles.silver}/>
					<span>{medals.silver.length}</span>
				</div>
				<div className={styles.icon}>
					<IconPentagonNumber3 className={styles.bronze}/>
					<span>{medals.bronze.length}</span>
				</div>
			</div>
		</div> : null }
	</div>;

	const renderDesktopView = () => <div className={styles.cardHeader}>
		<div className={styles.row}>
			<div className={styles.title}>
				<span className={styles.tournamentName}>{tournamentName}</span>
				<div className={styles.icons}>
					<PlayersInTournament
						playerCount={playerCount}
						playerNames={playerNames}
					/>
					{areMedalsWon ? <>
						<div className={styles.icon}>
							<IconPentagonNumber1
								className={styles.gold}
							/>
							<span>{medals.gold.length}</span>
						</div>
						<div className={styles.icon}>
							<IconPentagonNumber2 className={styles.silver}/>
							<span>{medals.silver.length}</span>
						</div>
						<div className={styles.icon}>
							<IconPentagonNumber3 className={styles.bronze}/>
							<span>{medals.bronze.length}</span>
						</div>
					</>
						: null }
				</div>
			</div>
		</div>
		<div className={styles.row}>
			<span className={styles.subTitle}>{city}</span>
			<span className={styles.subTitle}>
				{isSameDay ? firstDayLabel : `${firstDayLabel} - ${lastDayLabel}`}
			</span>
		</div>
	</div>;

	return <div className={styles.card}>
		{isDesktop ? renderDesktopView() : renderMobileView()}
		<Divider
			className={styles.divider}
			size="sm"
		/>
		{areMedalsWon ? <div className={styles.medals}>
			<TournamentMedals
				club={club}
				medals={medals.gold}
				title={t('FIRST')}
			/>
			<TournamentMedals
				club={club}
				medals={medals.silver}
				title={t('SECOND')}
			/>
			<TournamentMedals
				club={club}
				medals={medals.bronze}
				title={t('THIRD')}
			/>
		</div>: renderEmptyStatePodium()}
	</div>;
};
