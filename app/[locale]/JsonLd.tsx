'use client';

import { useEffect, useState } from 'react';

type Props = {
    schema: Record<string, any>;
};

export default function JsonLd({ schema }: Props) {
    const [loaded, setLoaded] = useState(false);

    // Hydration xatosini oldini olish uchun client-da render
    useEffect(() => setLoaded(true), []);

    if (!loaded) return null;

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
