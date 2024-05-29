import Image from 'next/image';
import './Transfers.css';

import arrowBottom from '../../../../../public/assets/ico/arrow-bottom.webp';

const Transfers = () => {
    return (
        <li className="transfers">
            <a href="#">Трансферы <Image placeholder={'blur'} width={10} src={arrowBottom} alt="Развернуть" title="Развернуть" /></a>
            <ul>
                <li><a href="#">Новости</a></li>
                <li><a href="#">Переходы</a></li>
            </ul>
        </li>
    );
};

export default Transfers;