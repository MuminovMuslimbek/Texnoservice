import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, defaultLocale } from '../../../../i18n';
import type { Metadata } from 'next';

type Props = { params: { locale: string; service: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedLocale: 'uz' | 'ru' | 'en' =
        locales.includes(params.locale as any)
            ? (params.locale as 'uz' | 'ru' | 'en')
            : defaultLocale;

    const t = await getTranslations(resolvedLocale);

    if (!Object.keys(t('meta.services')).includes(params.service)) notFound();

    return {
        title: t(`meta.services.${params.service}`),
        description: t('meta.homeDescription')
    };
}

export default async function ServicePage({ params }: Props) {
    const resolvedLocale: 'uz' | 'ru' | 'en' =
        locales.includes(params.locale as any)
            ? (params.locale as 'uz' | 'ru' | 'en')
            : defaultLocale;

    const t = await getTranslations(resolvedLocale);

    if (!Object.keys(t('meta.services')).includes(params.service)) notFound();

    return (
        <section id={params.service}>
            <h1>{t(`meta.services.${params.service}`)}</h1>
            <p>{t('meta.homeDescription')}</p>
        </section>
    );
}
