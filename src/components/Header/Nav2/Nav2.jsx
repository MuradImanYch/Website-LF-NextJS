'use client'

import './Nav2.css';
import Link from 'next/link';

import Others from './Others/Others';
import Transfers from './Transfers/Transfers';
import Search from './Search/Search';
import { usePathname } from 'next/navigation';

const Nav2 = () => {
    const pathname = usePathname();

    return (
        <div>
            <nav className="nav">
                <ul>
                    <li><Link href={pathname.startsWith('/en') ? '/en/news' : '/news'}>{pathname.startsWith('/en') ? 'News' : 'Новости'}</Link></li>
                    <li><Link href={pathname.startsWith('/en') ? '/en/matches' : '/matches'}>{pathname.startsWith('/en') ? 'Matches' : 'Матчи'}</Link></li>
                    <Transfers pathname={pathname} />
                    <li className='broadcasts-nav'><Link href={pathname.startsWith('/en') ? '/en/broadcasts' : '/broadcasts'}>{pathname.startsWith('/en') ? 'Broadcasts' : 'Трансляции'}</Link></li>
                    <Others pathname={pathname} />
                </ul>
                <div className="right-panel">
                    <Search/>
                </div>
            </nav>
        </div>
    );
};

export default Nav2;