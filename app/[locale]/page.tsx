'use client';

import { useTranslations } from 'next-intl';

export default function HomePage() {
    const t = useTranslations('meta');

    return (
        <main>
            <h1>{t('homeTitle')}</h1>
            <h2>{t('services.washingMachine')}</h2>
            <h2>{t('services.gasStove')}</h2>
            <h2>{t('services.airConditioner')}</h2>
        </main>
    );
}
