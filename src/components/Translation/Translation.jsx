'use client';

import { useEffect, useState } from 'react';
import translate from "@/libs/translate";
import { usePathname } from 'next/navigation';
import config from '../../../public/conf.json';

const Translation = ({ text }) => {
    const pathname = usePathname();
    const [translatedText, setTranslatedText] = useState('');

    useEffect(() => {
        const translateText = async () => {
            const result = await translate(text);
            setTranslatedText(result);
        };

        translateText();
    }, [text]);

    return <>{pathname.startsWith('/en') ? config['correct-translate-en'][translatedText] ? config['correct-translate-en'][translatedText] : translatedText : translatedText}</>;
};

export default Translation;