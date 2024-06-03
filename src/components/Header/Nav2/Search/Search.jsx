'use client'

import Image from 'next/image';
import './Search.css';
import { useState } from 'react';

import search from '../.././../../../public/assets/ico/search.webp';

const Search = () => {
    const[searchParams, setSearchParams] = useState('');

    const clearSearchParams = () => { // clear search params when unhover
        document.querySelector('.search').value = '';
        setSearchParams('');
    }
    
    const sendSearchParam = () => { // send search params
        searchParams.length > 0 && alert(searchParams);
        document.querySelector('.search').value = '';
        setSearchParams('');
    }
    const sendSearchParamsWithKey = (e) => { // send search params via enter
        if(e.key === 'Enter') {
            searchParams.length > 0 && alert(searchParams);
            document.querySelector('.search').value = '';
            setSearchParams('');
        }
    }

    return (
        <div className="search-wrap" onMouseLeave={clearSearchParams} onMouseEnter={clearSearchParams} >
            <input onKeyDown={sendSearchParamsWithKey} placeholder='Поиск по сайту' onChange={(e) => {setSearchParams(e.target.value)}} type="text" className='search' />
            <Image onClick={sendSearchParam} src={search} width={25} alt="Поиск" title="Поиск" />
        </div>
    );
};

export default Search;