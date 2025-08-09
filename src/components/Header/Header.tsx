import Botminton from '@assets/botminton.svg?react';
import styles from './Header.module.css';
import { IconBrandGithub } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { LanguageSwitcher } from '@components/LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from '@hooks/useTranslation';

export const Header = () => {

	const { t } = useTranslation();

	return <div className={styles.header}>
		<div className={styles.title}>
			<Botminton className={styles.logo}/>
			<label>{t('TITLE')}</label>
		</div>
		<div className={styles.icons}>
			<ActionIcon
				aria-label="Github"
				className={styles.icon}
				component="a"
				href="https://github.com/amourany/ffbad-new-ranking-simulator"
				target="_blank"
				variant="outline"
			>
				<IconBrandGithub/>
			</ActionIcon>
			<LanguageSwitcher/>
		</div>
	</div>;
};
