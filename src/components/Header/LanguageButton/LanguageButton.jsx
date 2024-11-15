'use client'

import Link from 'next/link';
import './LanguageButton.css';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const LanguageButton = () => {
    const pathname = usePathname();
    const[lang, setLang] = useState();

    useEffect(() => {
        pathname.split('/')[1] === 'en' ? setLang('en') : setLang("ru");
    }, []);

    return (
        <div className="langBtn">
            <select defaultValue={lang}>
                <Link href="/"><option value="ru">RU</option></Link>
                <Link href="/en"><option value="ru">EN</option></Link>
            </select>
        </div>
    );
};

export default LanguageButton;