'use client'

import './Nav2.css';
import Link from 'next/link';

import Others from './Others/Others';
import Transfers from './Transfers/Transfers';
import Search from './Search/Search';

const Nav2 = () => {
    return (
        <div>
            <nav className="nav">
                <ul>
                    <li><Link href="/news">Новости</Link></li>
                    <li><Link href="/matches">Матчи</Link></li>
                    <Transfers />
                    <li className='broadcasts'><Link href="/broadcasts">Трансляции</Link></li>
                    <Others />
                </ul>
                <div className="right-panel">
                    <Search />
                </div>
            </nav>
        </div>
    );
};

export default Nav2;