import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './config';

export default getRequestConfig(async ({ locale }) => {
    const resolvedLocale: 'uz' | 'ru' | 'en' =
        locales.includes(locale as any) ? (locale as 'uz' | 'ru' | 'en') : defaultLocale;

    return {
        locale: resolvedLocale,
        messages: (await import(`../messages/${resolvedLocale}.json`)).default
    };
});
