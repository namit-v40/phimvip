import {useLocale, useTranslations} from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';

export default function LocaleSwitcher() {
  const t = useTranslations('Locale_switcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
        defaultValue={locale}
        items={[
        {
            value: 'vi',
            label: t('vi')
        },
        {
            value: 'en',
            label: t('en')
        }
        ]}
    />
  );
}