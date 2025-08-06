import {AppShell, Tabs, useMantineTheme} from '@mantine/core';
import styles from './Layout.module.css';
import { PropsWithChildren } from 'react';
import { Header } from '@components/Header/Header';
import { Link, useRouterState } from '@tanstack/react-router';
import { Route as simulateRoute } from '@routes/simulate';
import { Route as simulateTournamentRoute } from '@routes/simulate-tournament';
import { Route as clubPodiumsRoute } from '@routes/club-podiums';
import { useTranslation } from '@hooks/useTranslation';
import { IconTournament, IconTrophy, IconVs } from '@tabler/icons-react';
import { RankingExplanation } from '@components/RankingExplanation/RankingExplanation';
import { useMediaQuery } from '@mantine/hooks';

// @ts-ignore
export const Layout = ({ children }: PropsWithChildren) => {
	const location = useRouterState({ select: (s) => s.location });
	const { t } = useTranslation({ keyPrefix: 'LAYOUT' });

	const theme = useMantineTheme();
	const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`, true);
	const activeTab = location.pathname.slice(1).length > 0 ? location.pathname.slice(1) : 'simulate-tournament';

	const renderContentWithExplanation = () => (
		<div className={styles.content}>
			<RankingExplanation />
			{children}
		</div>
	);

	const renderContent = () => (
		<div className={styles.content}>
			{children}
		</div>
	);

	const renderDesktopView = () => (
		<Tabs
			keepMounted={false}
			radius="md"
			value={activeTab}
			variant="outline"
		>
			<Tabs.List>
				<Tabs.Tab value="simulate">
					<Link
						className={styles.navigationLink}
						to={simulateRoute.to}
					>
						<IconVs />
						{t('SIMULATE')}
					</Link>
				</Tabs.Tab>
				<Tabs.Tab value="simulate-tournament">
					<Link
						className={styles.navigationLink}
						to={simulateTournamentRoute.to}
					>
						<IconTournament />
						{t('SIMULATE_TOURNAMENT')}
					</Link>
				</Tabs.Tab>
				<Tabs.Tab value="club-podiums">
					<Link
						className={styles.navigationLink}
						to={clubPodiumsRoute.to}
					>
						<IconTrophy />
						{t('CLUB_PODIUMS')}
					</Link>
				</Tabs.Tab>
			</Tabs.List>
			<Tabs.Panel value="simulate">
				{renderContentWithExplanation()}
			</Tabs.Panel>
			<Tabs.Panel value="simulate-tournament">
				{renderContentWithExplanation()}
			</Tabs.Panel>
			<Tabs.Panel value="club-podiums">
				{renderContent()}
			</Tabs.Panel>
		</Tabs>
	);

	const renderMobileNavigation = () => (
		<AppShell.Footer className={styles.footer}>
			<Link
				activeProps={{ className:styles.active }}
				className={styles.navigationLink}
				to={simulateRoute.to}
			>
				<div className={styles.footerEntry}>
					<IconVs/>
					{t('MOBILE_SIMULATE')}
				</div>
			</Link>
			<Link
				activeProps={{ className:styles.active }}
				className={styles.navigationLink}
				to={simulateTournamentRoute.to}
			>
				<div className={styles.footerEntry}>
					<IconTournament/>
					{t('MOBILE_SIMULATE_TOURNAMENT')}
				</div>
			</Link>
			<Link
				activeProps={{ className:styles.active }}
				className={styles.navigationLink}
				to={clubPodiumsRoute.to}
			>
				<div className={styles.footerEntry}>
					<IconTrophy />
					{t('MOBILE_CLUB_PODIUMS')}
				</div>
			</Link>
		</AppShell.Footer>
	);

	return (
		<AppShell
			footer={{
				height: 60,
			}}
			header={{
				height: 60,
			}}
			padding="md"
		>
			<AppShell.Header>
				<Header/>
			</AppShell.Header>
			<AppShell.Main>
				{isDesktop ? renderDesktopView() : renderContentWithExplanation()}
			</AppShell.Main>
			{!isDesktop? renderMobileNavigation():null}
		</AppShell>
	);
};
