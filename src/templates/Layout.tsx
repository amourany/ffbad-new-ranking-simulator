import { AppShell } from '@mantine/core';
import styles from './Layout.module.css';
import { PropsWithChildren } from 'react';
import { Header } from '@components/Header/Header';

export const Layout = ({ children }: PropsWithChildren) => (
	<AppShell
		header={{
			height: 60,
		}}
		padding="lg"
	>
		<AppShell.Header className={styles.header}>
			<Header />
		</AppShell.Header>
		<AppShell.Main>
			{children}
		</AppShell.Main>
	</AppShell>
);
