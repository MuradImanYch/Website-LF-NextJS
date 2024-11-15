'use client'

import Image from 'next/image';
import './Search.css';
import { useState } from 'react';
import search from '../.././../../../public/assets/ico/search.webp';
import { usePathname, useRouter } from 'next/navigation';

const Search = () => {
    const pathname = usePathname();
    const[searchParams, setSearchParams] = useState('');
    const router = useRouter();

    const clearSearchParams = () => { // clear search params when unhover
        /* document.querySelector('.search').value = '';
        setSearchParams(''); */
    }
    
    const sendSearchParam = () => { // send search params
        searchParams.length > 0 && router.push(`${pathname.startsWith('/en') ? '/en' : ''}/search/${searchParams}`);
        document.querySelector('.search').value = '';
        setSearchParams('');
    }
    const sendSearchParamsWithKey = (e) => { // send search params via enter
        if(e.key === 'Enter') {
            searchParams.length > 0 && router.push(`${pathname.startsWith('/en') ? '/en' : ''}/search/${searchParams}`);
            document.querySelector('.search').value = '';
            setSearchParams('');
        }
    }

    return (
        <div className="search-wrap" onMouseLeave={clearSearchParams} onMouseEnter={clearSearchParams} >
            <input onKeyDown={sendSearchParamsWithKey} placeholder={pathname.startsWith('/en') ? 'Search' : 'Искать'} onChange={(e) => {setSearchParams(e.target.value)}} type="text" className='search' />
            <Image placeholder={'empty'} onClick={sendSearchParam} src={search} width={25} alt={pathname.startsWith('/en') ? 'Search' : 'Искать'} title={pathname.startsWith('/en') ? 'Search' : 'Искать'} />
        </div>
    );
};

export default Search;