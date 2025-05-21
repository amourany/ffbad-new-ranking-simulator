import {useTranslation} from "@hooks/useTranslation";

export const BackSoon = () => {
    const {t} = useTranslation({keyPrefix: 'BACK_SOON'});
    return <div>
        {t('TITLE')}
    </div>;
}
