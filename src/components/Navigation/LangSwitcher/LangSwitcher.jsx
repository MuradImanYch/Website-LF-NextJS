'use client';

import Image from 'next/image';
import './LangSwitcher.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const LangSwitcher = ({ onClick }) => {
    const pathname = usePathname();

    const value = useSelector((state) => state.string.value);

    return (
        <div className='lang-switcher'>
            {value ? <><Link onClick={onClick} href={`/news/read/${value && value.ru}`}><Image width={'28'} height={'20'} placeholder={'empty'} alt={pathname.startsWith('/en') ? 'To russian' : 'На русский'} title={pathname.startsWith('/en') ? 'To russian' : 'На русский'} src='https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Russia.png' /></Link>
            <Link onClick={onClick} href={`/en/news/read/${value && value.en}`}><Image width={'28'} height={'20'} placeholder={'empty'} alt={pathname.startsWith('/en') ? 'To english' : 'На английский'} title={pathname.startsWith('/en') ? 'To english' : 'На английский'} src='https://upload.wikimedia.org/wikipedia/commons/4/42/Flag_of_the_United_Kingdom.png' /></Link></> : <><Link onClick={onClick} href={pathname.startsWith('/en') ? pathname === '/en' ? pathname.replace('en', '') : pathname.replace('/en', '') : pathname}><Image width={'28'} height={'20'} placeholder={'empty'} alt={pathname.startsWith('/en') ? 'To russian' : 'На русский'} title={pathname.startsWith('/en') ? 'To russian' : 'На русский'} src='https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Russia.png' /></Link>
            <Link onClick={onClick} href={pathname.startsWith('/en') ? pathname : `/en${pathname}`}><Image width={'28'} height={'20'} placeholder={'empty'} alt={pathname.startsWith('/en') ? 'To english' : 'На английский'} title={pathname.startsWith('/en') ? 'To english' : 'На английский'} src='https://upload.wikimedia.org/wikipedia/commons/4/42/Flag_of_the_United_Kingdom.png' /></Link></>}
        </div>
    );
};

export default LangSwitcher;