import { TitleProps } from '@components/Title/Title';
import { InfoTooltip } from '@components/InfoTooltip/InfoTooltip';
import styles from './SubTitle.module.css';

export const SubTitle = ({ label, withTooltip, tooltipContent }:TitleProps) => (<div className={styles.titleContainer}>
	<h2 className={styles.title}>{label}</h2>
	{withTooltip ? <InfoTooltip content={tooltipContent!!} /> : null}
</div>);
