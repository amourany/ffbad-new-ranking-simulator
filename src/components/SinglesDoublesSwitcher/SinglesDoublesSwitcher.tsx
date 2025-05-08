import { IconUsersMinus, IconUsersPlus } from '@tabler/icons-react';
import { ReactElement } from 'react';
import { Button } from '@mantine/core';
import styles from './SinglesDoublesSwitcher.module.css';

export type SinglesDoublesSwitcherProps = {
	singlesLabel: string;
	doublesLabel: string;
	isDoublesMatch: boolean;
	onChange: () => void;
};

export const SinglesDoublesSwitcher = ({ singlesLabel, doublesLabel, isDoublesMatch, onChange }:SinglesDoublesSwitcherProps) => {

	const renderMatchTypeSwitch = (children: ReactElement) => (
		<div className={styles.button}>
			<Button
				color= 'black'
				onClick={onChange}
				variant='subtle'
			>
				{children}
			</Button>
		</div>
	);

	return <>
		{isDoublesMatch ? renderMatchTypeSwitch(<>
			<IconUsersMinus />
			<div className={styles.buttonLabel}>{singlesLabel}</div>
		</>) :
			renderMatchTypeSwitch(<>
				<IconUsersPlus />
				<div className={styles.buttonLabel}>{doublesLabel}</div>
			</>)}
	</>;
};
