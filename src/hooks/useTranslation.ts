import { UseTranslationOptions, useTranslation as useTranslationI18n } from 'react-i18next';

export const useTranslation = (options?: UseTranslationOptions<string>) => useTranslationI18n('', options);
