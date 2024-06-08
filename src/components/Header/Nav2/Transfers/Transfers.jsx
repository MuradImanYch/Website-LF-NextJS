import Image from 'next/image';
import './Transfers.css';
import Link from 'next/link';

import arrowBottom from '../../../../../public/assets/ico/arrow-bottom.webp';

const Transfers = () => {
    return (
        <li className="transfers">
            <div href="#">Трансферы <Image width={10} src={arrowBottom} alt="Развернуть" title="Развернуть" /></div>
            <ul>
                <li><Link href="/transfers-news">Новости</Link></li>
                <li><Link href="/transfers-list">Список</Link></li>
            </ul>
        </li>
    );
};

export default Transfers;