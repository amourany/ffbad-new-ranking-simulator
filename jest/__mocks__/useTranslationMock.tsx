export const mockT = jest.fn((key: string) => key);

jest.mock('react-i18next', () => ({
	...jest.requireActual('react-i18next'),
	Trans: ({ i18nKey }: { i18nKey: string }) => <div>{i18nKey}</div>,
	initReactI18next: {
		init: () => {},
		type: '3rdParty',
	},
	t: mockT,
	useTranslation: () => ({
		i18n: {
			changeLanguage: () => new Promise(() => {}),
			language: 'fr',
			resolvedLanguage: 'fr',
		},
		t: mockT,
	}),
}));

jest.mock('i18next', () => ({
	...jest.requireActual('i18next'),
	t: mockT,
}));
