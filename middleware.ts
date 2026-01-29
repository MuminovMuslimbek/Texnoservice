import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
    locales,
    defaultLocale,
    localeDetection: false   // 🔥 MUHIM
});

export const config = {
    matcher: ['/', '/(uz|ru|en)/:path*']
};
