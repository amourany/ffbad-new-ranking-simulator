import { AppShell, Tabs } from '@mantine/core';
import styles from './Layout.module.css';
import { PropsWithChildren, useState } from 'react';
import { Header } from '@components/Header/Header';
import { Link, useMatchRoute } from '@tanstack/react-router';
import { Route as convertRoute } from '@routes/convert';
import { Route as simulateRoute } from '@routes/simulate';
import { useTranslation } from '@hooks/useTranslation';
import { IconTransform, IconVs } from '@tabler/icons-react';
import { RankingExplanation } from '@components/RankingExplanation/RankingExplanation';

export const Layout = ({ children }: PropsWithChildren) => {
	const matchRoute = useMatchRoute();
	const isConvertRoute = matchRoute({ to :convertRoute.to });
	const { t } = useTranslation({ keyPrefix: 'LAYOUT' });
	const [
		activeTab,
		setActiveTab,
	] = useState<string|null>(isConvertRoute ? 'convert' : 'simulate');

	return (
		<AppShell
			header={{
				height: 60,
			}}
			padding="md"
		>
			<AppShell.Header className={styles.header}>
				<Header/>
			</AppShell.Header>
			<AppShell.Main>
				<Tabs
					keepMounted={false}
					onChange={setActiveTab}
					radius="md"
					value={activeTab}
					variant="outline"
				>
					<Tabs.List>
						<Tabs.Tab value="simulate">
							<Link to={simulateRoute.to}>
								<IconVs />
								{t('SIMULATE')}
							</Link>
						</Tabs.Tab>
						<Tabs.Tab value="convert">
							<Link to={convertRoute.to}>
								<IconTransform/>
								{' '}
								{t('CONVERT')}
							</Link>
						</Tabs.Tab>
					</Tabs.List>
					<Tabs.Panel value="convert">
						<div className={styles.content}>
							<RankingExplanation />
							{children}
						</div>
					</Tabs.Panel>
					<Tabs.Panel value="simulate">
						<div className={styles.content}>
							<RankingExplanation />
							{children}
						</div>
					</Tabs.Panel>
				</Tabs>
			</AppShell.Main>
		</AppShell>
	);
};
