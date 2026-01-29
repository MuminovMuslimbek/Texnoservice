import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales, defaultLocale } from '../../i18n';
import type { Metadata } from 'next';
import JsonLd from './JsonLd'; // Client Component for JSON-LD

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

// Generate metadata dynamically for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    const resolvedLocale: 'uz' | 'ru' | 'en' =
        typeof locale === 'string' && locales.includes(locale as any)
            ? (locale as 'uz' | 'ru' | 'en')
            : defaultLocale;

    let messages;
    try {
        messages = (await import(`../../messages/${resolvedLocale}.json`)).default;
    } catch {
        notFound();
    }

    return {
        title: messages.meta.homeTitle,
        description: messages.meta.homeDescription,
        alternates: {
            canonical: `https://www.yoursite.com/${resolvedLocale}`,
            languages: locales.reduce((acc, l) => {
                acc[l] = `https://www.yoursite.com/${l}`;
                return acc;
            }, {} as Record<string, string>)
        },
        openGraph: {
            title: messages.meta.homeTitle,
            description: messages.meta.homeDescription,
            url: `https://www.yoursite.com/${resolvedLocale}`,
            siteName: 'Texnoservis',
            locale: resolvedLocale,
            type: 'website'
        }
    };
}

// LocaleLayout Component
export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    const resolvedLocale: 'uz' | 'ru' | 'en' =
        typeof locale === 'string' && locales.includes(locale as any)
            ? (locale as 'uz' | 'ru' | 'en')
            : defaultLocale;

    // Load translations
    let messages;
    try {
        messages = (await import(`../../messages/${resolvedLocale}.json`)).default;
    } catch {
        notFound();
    }

    // JSON-LD schema data
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Texnoservis",
        "url": `https://www.yoursite.com/${resolvedLocale}`,
        "serviceArea": "Toshkent",
        "availableLanguage": ["uz", "ru", "en"],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Texnika ta'miri",
            "itemListElement": [
                { "@type": "Service", "name": messages.meta.services.washingMachine },
                { "@type": "Service", "name": messages.meta.services.gasStove },
                { "@type": "Service", "name": messages.meta.services.airConditioner },
                { "@type": "Service", "name": messages.meta.services.refrigerator },
                { "@type": "Service", "name": messages.meta.services.dishwasher },
                { "@type": "Service", "name": messages.meta.services.microwave }
            ]
        }
    };

    return (
        <html lang={resolvedLocale}>
            <head>
                {/* JSON-LD */}
                <JsonLd schema={schema} />
            </head>
            <body>
                <NextIntlClientProvider locale={resolvedLocale} messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
