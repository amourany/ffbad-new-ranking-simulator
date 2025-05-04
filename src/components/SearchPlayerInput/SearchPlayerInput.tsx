import { Combobox, TextInput, useCombobox } from '@mantine/core';
import { useTranslation } from '@hooks/useTranslation';
import { useDebouncedCallback, useDidUpdate, useInViewport } from '@mantine/hooks';
import { useState } from 'react';
import { useSearchPlayer } from '@api/search-player/useSearchPlayer';
import styles from './SearchPlayerInput.module.css';

export type SearchPlayerInputProps = {
	label?: string;
	onChange: (licence: number) => void
};

export const SearchPlayerInput = ({ label, onChange }: SearchPlayerInputProps) => {
	const { t } = useTranslation({ keyPrefix: 'SEARCH_PLAYER_INPUT' });

	const [
		value,
		setValue,
	] = useState<string | undefined>(undefined);

	const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } = useSearchPlayer(value);
	const { ref: isBottomPageInViewportRef, inViewport: isBottomPageInViewport } = useInViewport();

	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
	});

	const handleOnChange = useDebouncedCallback(async (value:string|undefined) => {
		const isValid = !!value && value?.trim()?.length > 0;
		if (isValid) {
			setValue(value);
			combobox.openDropdown();
		} else {
			setValue(undefined);
			combobox.closeDropdown();
		}
	}, 500);

	const handleReopen = () => {
		if (value) {
			combobox.openDropdown();
		}
	};

	useDidUpdate(() => {
		if (isBottomPageInViewport && hasNextPage && !isFetching && !isFetchingNextPage) {
			void fetchNextPage({ cancelRefetch: false });
		}
	}, [
		isBottomPageInViewport,
		isFetching,
		hasNextPage,
	]);

	const renderOptions = () => <>
		{data?.map((item) => (
			<Combobox.Option
				key={item.licence}
				value={item.licence}
			>
				{item.name}
				{' - '}
				{item.club.acronym}
			</Combobox.Option>
		))}
		{isFetching ? <Combobox.Empty>{t('LOADING')}</Combobox.Empty>:null}
		{data ? <div ref={isBottomPageInViewportRef}/> : null}
	</>;

	return (
		<Combobox
			onOptionSubmit={(val) => {
				onChange(val as unknown as number);
				combobox.closeDropdown();
			}}
			store={combobox}
			withinPortal={false}
		>
			<Combobox.Target>
				<TextInput
					className={styles.input}
					label={label}
					onChange={(event) => handleOnChange(event.currentTarget.value)}
					onClick={() => handleReopen()}
					placeholder={t('PLACEHOLDER')}
					size='md'
				/>
			</Combobox.Target>

			<Combobox.Dropdown>
				<Combobox.Options className={styles.options}>
					{renderOptions()}
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
};
