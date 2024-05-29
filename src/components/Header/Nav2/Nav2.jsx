'use client'

import './Nav2.css';
import Others from './Others/Others';
import Transfers from './Transfers/Transfers';

import Search from './Search/Search';

const Nav2 = () => {
    return (
        <div>
            <nav className="nav">
                <ul>
                    <li><a href="#">Новости</a></li>
                    <li><a href="#">Матчи</a></li>
                    <Transfers />
                    <li><a href="#">Трансляции</a></li>
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