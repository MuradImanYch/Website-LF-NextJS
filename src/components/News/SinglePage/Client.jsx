'use client';

import { useDispatch } from 'react-redux';
import { setString } from '@/redux/slices/url';
import { usePathname } from 'next/navigation';

const Client = ({ url }) => {
    const dispatch = useDispatch();
    const pathname = usePathname();

    pathname.includes('/news/read') ? dispatch(setString({ru: url.ru, en: url.en})) : dispatch(setString('/news'));

    return null; // Этот компонент просто диспатчит данные и не рендерит ничего
};

export default Client;