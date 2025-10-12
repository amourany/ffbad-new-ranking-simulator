import { Popover } from '@mantine/core';
import { IconUsers } from '@tabler/icons-react';
import styles from './PlayersInTournament.module.css';

export type PlayersInTournamentProps = {
	playerCount: number;
	playerNames: string[]
};

export const PlayersInTournament = ({ playerCount, playerNames }: PlayersInTournamentProps) => <Popover
	shadow="md"
>
	<Popover.Target>
		<div className={styles.icon}>
			<IconUsers size={18}/>
			{playerCount}
		</div>
	</Popover.Target>
	<Popover.Dropdown>
		{playerNames.map((name) => (<div key={name}>{name}</div>))}
	</Popover.Dropdown>
</Popover>;
