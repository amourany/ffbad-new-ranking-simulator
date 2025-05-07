import { InfoTooltip } from '@components/InfoTooltip/InfoTooltip';
import styles from './Title.module.css';

export type TitleProps = {
	label: string;
	withTooltip?: boolean;
	tooltipContent?: string[];
};

export const Title = ({ label, withTooltip, tooltipContent }: TitleProps)  => (<div className={styles.titleContainer}>
	<h1 className={styles.title}>{label}</h1>
	{withTooltip ? <InfoTooltip content={tooltipContent!!} /> : null}
</div>);
