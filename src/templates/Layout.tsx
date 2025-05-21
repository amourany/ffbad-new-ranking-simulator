import { AppShell, Tabs, useMantineTheme } from '@mantine/core';
import styles from './Layout.module.css';
import { PropsWithChildren } from 'react';
import { Header } from '@components/Header/Header';
import { Link, useRouterState } from '@tanstack/react-router';
import { Route as convertRoute } from '@routes/convert';
import { Route as simulateRoute } from '@routes/simulate';
import { Route as simulateTournamentRoute } from '@routes/simulate-tournament';
import { useTranslation } from '@hooks/useTranslation';
import { IconTournament, IconTransform, IconVs } from '@tabler/icons-react';
import { RankingExplanation } from '@components/RankingExplanation/RankingExplanation';
import { useMediaQuery } from '@mantine/hooks';
import {BackSoon} from "@components/BackSoon/BackSoon";

// @ts-ignore
export const Layout = ({ children }: PropsWithChildren) => {
	const location = useRouterState({ select: (s) => s.location });
	const { t } = useTranslation({ keyPrefix: 'LAYOUT' });

	const theme = useMantineTheme();
	const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`, true);
	const activeTab = location.pathname.slice(1).length > 0 ? location.pathname.slice(1) : 'convert';

	const renderContent = () => (
		<div className={styles.content}>
			<RankingExplanation />
			{/*{children}*/}
			<BackSoon />
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
				<Tabs.Tab value="convert">
					<Link to={convertRoute.to}>
						<IconTransform/>
						{t('CONVERT')}
					</Link>
				</Tabs.Tab>
				<Tabs.Tab value="simulate">
					<Link to={simulateRoute.to}>
						<IconVs />
						{t('SIMULATE')}
					</Link>
				</Tabs.Tab>
				<Tabs.Tab value="simulate-tournament">
					<Link to={simulateTournamentRoute.to}>
						<IconTournament />
						{t('SIMULATE_TOURNAMENT')}
					</Link>
				</Tabs.Tab>
			</Tabs.List>
			<Tabs.Panel value="convert">
				{renderContent()}
			</Tabs.Panel>
			<Tabs.Panel value="simulate">
				{renderContent()}
			</Tabs.Panel>
			<Tabs.Panel value="simulate-tournament">
				{renderContent()}
			</Tabs.Panel>
		</Tabs>
	);

	const renderMobileNavigation = () => (
		<AppShell.Footer className={styles.footer}>
			<Link
				activeProps={{ className:styles.active }}
				to={simulateRoute.to}
			>
				<IconVs />
				{t('MOBILE_SIMULATE')}
			</Link>
			<Link
				activeProps={{ className:styles.active }}
				to={convertRoute.to}
			>
				<IconTransform/>
				{t('MOBILE_CONVERT')}
			</Link>
			<Link
				activeProps={{ className:styles.active }}
				to={simulateTournamentRoute.to}
			>
				<IconTournament />
				{t('MOBILE_SIMULATE_TOURNAMENT')}
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
			<AppShell.Header className={styles.header}>
				<Header/>
			</AppShell.Header>
			<AppShell.Main>
				{isDesktop ? renderDesktopView() : renderContent()}
			</AppShell.Main>
			{!isDesktop? renderMobileNavigation():null}
		</AppShell>
	);
};
