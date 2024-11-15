import Image from 'next/image';
import './Transfers.css';
import Link from 'next/link';

import arrowBottom from '../../../../../public/assets/ico/arrow-bottom.webp';

const Transfers = ({pathname}) => {
    return (
        <li className="transfers">
            <div href="#">{pathname.startsWith('/en') ? 'Transfers' : 'Трансферы'} <Image width={10} src={arrowBottom} alt={"Развернуть"} title={"Развернуть"} /></div>
            <ul>
                <li><Link href={pathname.startsWith('/en') ? '/en/transfer-news' : '/transfer-news'}>{pathname.startsWith('/en') ? 'News' : 'Новости'}</Link></li>
                <li><Link href={pathname.startsWith('/en') ? '/en/transfer-list' : '/transfer-list'}>{pathname.startsWith('/en') ? 'List' : 'Список'}</Link></li>
            </ul>
        </li>
    );
};

export default Transfers;