import { Loader as MantineLoader } from '@mantine/core';
import styles from './Loader.module.css';

export type LoaderProps = {
	title: string
};

export const Loader = ({ title }: LoaderProps) => <div className={styles.container}>
	<MantineLoader
		color="blue"
		type="bars"
	/>
	<div>{title}</div>
</div>;
