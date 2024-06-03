import Image from "next/image";
import './Others.css';
import Link from "next/link";

import arrowBottom from '../../../../../public/assets/ico/arrow-bottom.webp';

const Others = () => {
    return (
        <li className="others">
            <div href="#">Ещё <Image width={10} src={arrowBottom} alt="Развернуть" title="Развернуть" /></div>
            <ul>
                <li className="transfer-news"><Link href="#">Новости трансферов</Link></li>
                <li className="transfer-transfers"><Link href="#">Список трансферов</Link></li>
                <li><Link href="#">Оффтопы</Link></li>
                <li><Link href="#">Блоги</Link></li>
                <li><Link href="#">Видео</Link></li>
                <li><Link href="#">Рейтинг УЕФА</Link></li>
                <li><Link href="#">Рейтинг ФИФА</Link></li>
                <li><Link href="#">ТВ Расписание</Link></li>
                <li><Link href="#">Котироаки</Link></li>
            </ul>
        </li>
    );
};

export default Others;