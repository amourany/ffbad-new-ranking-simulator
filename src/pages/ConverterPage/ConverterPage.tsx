import { Button, Divider, NumberInput, Stack } from '@mantine/core';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { PlayerInfo, useFetchPlayersRankings } from '@api/player-ranking/useFetchPlayersRankings';
import { DisplayNewRankings } from '@components/DisplayNewRankings/DisplayNewRankings';
import { useTranslation } from '@hooks/useTranslation';
import styles from './ConverterPage.module.css';
import { UseQueryResult } from '@tanstack/react-query';

export const ConverterPage = () => {

	const { t } = useTranslation({ keyPrefix: 'HOME_PAGE' });
	const [
		licence,
		setLicence,
	] = useState<number|undefined>(undefined);
	const players = useFetchPlayersRankings({ me: licence });
	const { data, isLoading } = players.find(item => item[0] === 'me')?.[1] as UseQueryResult<PlayerInfo>;

	const form = useForm({
		initialValues: {
			licence: undefined,
		},
		mode: 'uncontrolled',
		validate: {
			licence: (value: number|undefined) => !!value ? undefined : t('ERROR.NO_LICENCE'),
		},
	});


	const handleOnSubmit = (values: typeof form.values) => {
		setLicence(values.licence);
	};

	return (
		<div>
			<Stack
				classNames={{
					root: styles.stack,
				}}
			>
				<form onSubmit={form.onSubmit(handleOnSubmit)}>
					<div className={styles.inputLine}>
						<NumberInput
							allowDecimal={false}
							allowNegative={false}
							hideControls
							key={form.key('licence')}
							pattern="[0-9]*"
							step={0}
							thousandSeparator={false}
							{...form.getInputProps('licence')}
							placeholder={t('PLACEHOLDER')}
						/>
						<Button
							className={styles.button}
							loading={isLoading}
							type="submit"
						>
							{t('SUBMIT')}
						</Button>
					</div>
				</form>
				<Divider />
				{data ? <DisplayNewRankings playerInfo={data}/> : null}
			</Stack>
		</div>
	);
};
