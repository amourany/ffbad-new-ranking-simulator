import { NumberInput } from '@mantine/core';
import { useTranslation } from '@hooks/useTranslation';
import { useField } from '@mantine/form';
import styles from './LicenceInput.module.css';
import { useDebouncedCallback } from '@mantine/hooks';

export type LicenceInputProps = {
	placeholder: string,
	onChange: (licence: number) => void
};

export const LicenceInput = ({  placeholder, onChange }: LicenceInputProps) => {
	const { t } = useTranslation({ keyPrefix: 'LICENCE_INPUT' });

	const field = useField({
		initialValue: undefined as number|undefined,
		validate: (value: number|undefined) => !!value ? undefined : t('ERROR.NO_LICENCE'),
		validateOnChange: true,
	});

	const handleOnChange = useDebouncedCallback(async (value:number|undefined) => {
		field.setValue(value);
		await field.validate();
		const isValidating = field.isValidating;
		const hasErrors = !!field.error;
		if (!isValidating && !hasErrors) {
			onChange(field.getValue()!!);
		}
	}, 500);

	return (<div className={styles.inputLine}>
		<NumberInput
			allowDecimal={false}
			allowNegative={false}
			hideControls
			pattern="[0-9]*"
			step={0}
			thousandSeparator={false}
			{...field.getInputProps()}
			onChange={(event) => handleOnChange(event as number)}
			placeholder={placeholder}
		/>
	</div>
	);
};
