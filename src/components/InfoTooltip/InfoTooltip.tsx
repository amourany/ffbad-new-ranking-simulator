import { Popover } from '@mantine/core';
import { IconInfoCircleFilled } from '@tabler/icons-react';
import styles from './InfoTooltip.module.css';

export type InfoTooltipProps = {
	content: string[],
};

export const InfoTooltip = ({ content }: InfoTooltipProps) => (<Popover
	position='bottom'
	shadow='md'
	width={300}
	withArrow
>
	<Popover.Target>
		<IconInfoCircleFilled
			className={styles.icon}
		/>
	</Popover.Target>
	<Popover.Dropdown>
		{content.map((content, index) => (
			<div key={index}>{content}</div>
		))}
	</Popover.Dropdown>
</Popover>);
