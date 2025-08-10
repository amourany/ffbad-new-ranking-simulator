import { useDidUpdate, useInViewport } from '@mantine/hooks';
import { useFetchLastWeekTournaments } from '@api/search-tournaments/useSearchTournaments';
import { TournamentResultCard } from '@components/TournamentResultCard/TournamentResultCard';
import { SearchPlayerInput } from '@components/SearchPlayerInput/SearchPlayerInput';
import { BFFPlayer } from '@api/search-player/useSearchPlayer';
import { useState } from 'react';
import { ActionIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { Title } from '@components/Title/Title';
import { useTranslation } from '@hooks/useTranslation';
import styles from './ClubTournamentResultsPage.module.css';
import { Loader } from '@components/Loader/Loader';
import { getRangeThursdayToThursday } from '@utils/dateRange';
import dayjs from 'dayjs';
import { useDateFormat } from '@hooks/useFormatDate';

export const ClubTournamentResultsPage = () => {

	const { t } = useTranslation({ keyPrefix: 'TOURNAMENT_RESULTS_PAGE' });

	const [
		player,
		setPlayer,
	] = useState<BFFPlayer | undefined>(undefined);
	const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } = useFetchLastWeekTournaments(player?.licence, player?.club);
	const { ref: isBottomPageInViewportRef, inViewport: isBottomPageInViewport } = useInViewport();

	useDidUpdate(() => {
		if (isBottomPageInViewport && hasNextPage && !isFetching && !isFetchingNextPage ) {
			void fetchNextPage({ cancelRefetch: false });
		}
	}, [
		isBottomPageInViewport,
		isFetching,
		hasNextPage,
	]);

	const { formatDate } = useDateFormat();

	const { from, to }= getRangeThursdayToThursday(dayjs().toDate());

	const renderEmptyState = () => <div>{t('EMPTY_STATE')}</div>;

	return <div className={styles.container}>
		{player ?
			<div className={styles.title}>
				<Title label={t('TITLE_CLUB', { club: player.club })}/>
				<div className={styles.clearButton}>
					<ActionIcon
						aria-label="Clear"
						color="black"
						onClick={() => setPlayer(undefined)}
						size="sm"
						variant="transparent"
					>
						<IconX/>
					</ActionIcon>
				</div>
			</div> : <Title label={t('TITLE')}/>}
		{player ? <div className={styles.subTitle}>
			{t('DATES', { from: formatDate(from),
				to: formatDate(to) })}
		</div> : null}
		{!player ?
			<SearchPlayerInput
				label={t('INPUT_LABEL')}
				onChange={setPlayer}
			/> : null
		}
		{data ?
			<div className={styles.cards}>
				{data.length === 0 && !hasNextPage ? renderEmptyState() : data.map(tournament => (
					<div
						className={styles.card}
						key={tournament.tournament.id}
					>
						<TournamentResultCard
							city={tournament.tournament.city}
							club={player!.club}
							firstDay={tournament.tournament.firstDay}
							lastDay={tournament.tournament.lastDay}
							medals={tournament.medals}
							playerCount={tournament.players.length}
							tournamentName={tournament.tournament.name}
						/>
					</div>
				))}
			</div> : null}
		{isFetching ? <div><Loader title={t('LOADING')} /></div> : null}
		<div ref={isBottomPageInViewportRef}/>
	</div>;
};