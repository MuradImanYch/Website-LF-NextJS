import Image from "next/image";
import './Others.css';
import Link from "next/link";

import arrowBottom from '../../../../../public/assets/ico/arrow-bottom.webp';

const Others = () => {
    return (
        <li className="others">
            <div href="#">Ещё <Image placeholder={'empty'} width={10} src={arrowBottom} alt="Развернуть" title="Развернуть" /></div>
            <ul>
                <li className="transfer-news"><Link href="/transfer-news">Новости трансферов</Link></li>
                <li className="transfer-transfers"><Link href="/transfer-list">Список трансферов</Link></li>
                <li><Link href="/offtop-news">Оффтопы</Link></li>
                <li><Link href="/blogs">Блоги</Link></li>
                <li><Link href="/video">Видео</Link></li>
                <li><Link href="/uefa-ranking ">Рейтинг УЕФА</Link></li>
                <li><Link href="/fifa-ranking ">Рейтинг ФИФА</Link></li>
                <li><Link href="/tv-schedule ">ТВ Расписание</Link></li>
                <li><Link href="/odds">Котировки</Link></li>
                <li><Link href="/photo">Фотогалерея</Link></li>
                <li><Link href="/vk-feed">Лента ВК</Link></li>
                <li><Link href="/tags">Теги</Link></li>
            </ul>
        </li>
    );
};

export default Others;