import { Button, Container, Divider, Stack, TextInput } from '@mantine/core';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { useFetchPlayerRankings } from '@api/player-ranking/useFetchPlayerRankings';
import { DisplayNewRankings } from '@components/DisplayNewRankings/DisplayNewRankings';
import { useTranslation } from '@hooks/useTranslation';
import styles from './HomePage.module.css';

export const HomePage = () => {

	const { t } = useTranslation({ keyPrefix: 'HOME_PAGE' });
	const [
		licence,
		setLicence,
	] = useState<string|undefined>(undefined);
	const { data, isLoading } = useFetchPlayerRankings(licence);

	const form = useForm({
		initialValues: {
			licence: undefined,
		},
		mode: 'uncontrolled',
		validate: {
			licence: (value: string|undefined) => !!value && value?.trim()?.length > 0 ? undefined : t('ERROR.NO_LICENCE'),
		},
	});


	const handleOnSubmit = (values: typeof form.values) => {
		setLicence(values.licence);
	};

	return (
		<Container fluid>
			<Stack
				classNames={{
					root: styles.stack,
				}}
			>
				<form onSubmit={form.onSubmit(handleOnSubmit)}>
					<div className={styles.inputLine}>
						<TextInput
							key={form.key('licence')}
							type="number"
							{...form.getInputProps('licence')}
							placeholder={t('PLACEHOLDER')}
						/>
						<Button
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
		</Container>
	);
};
