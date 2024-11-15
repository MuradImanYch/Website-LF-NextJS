import Image from "next/image";
import './Others.css';
import Link from "next/link";

import arrowBottom from '../../../../../public/assets/ico/arrow-bottom.webp';

const Others = ({pathname}) => {
    return (
        <li className="others">
            <div href="#">{pathname.startsWith('/en') ? 'More' : 'Ещё'} <Image placeholder={'empty'} width={10} src={arrowBottom} alt={"Развернуть"} title={"Развернуть"} /></div>
            <ul>
                <li className="transfer-news"><Link href={pathname.startsWith('/en') ? '/en/transfer-news' : '/transfer-news'}>{pathname.startsWith('/en') ? 'Transfer news' : 'Новости трансферов'}</Link></li>
                <li className="transfer-transfers"><Link href={pathname.startsWith('/en') ? '/en/transfer-list' : '/transfer-list'}>{pathname.startsWith('/en') ? 'Transfer list' : 'Список трансферов'}</Link></li>
                <li><Link href={pathname.startsWith('/en') ? '/en/offtop-news' : '/offtop-news'}>{pathname.startsWith('/en') ? 'Offtopic' : 'Оффтопы'}</Link></li>
                <li><Link href={pathname.startsWith('/en') ? '/en/blogs' : '/blogs'}>{pathname.startsWith('/en') ? 'Blogs' : 'Блоги'}</Link></li>
                <li><Link href={pathname.startsWith('/en') ? '/en/video' : '/video'}>{pathname.startsWith('/en') ? 'Video' : 'Видео'}</Link></li>
                <li><Link href={pathname.startsWith('/en') ? '/en/uefa-ranking' : '/uefa-ranking'}>{pathname.startsWith('/en') ? 'UEFA Ranking' : 'Рейтинг УЕФА'}</Link></li>
                <li><Link href={pathname.startsWith('/en') ? '/en/fifa-ranking' : '/fifa-ranking'}>{pathname.startsWith('/en') ? 'FIFA Ranking' : 'Рейтинг ФИФА'}</Link></li>
                <li><Link href={pathname.startsWith('/en') ? '/en/tv-schedule' : '/tv-schedule'}>{pathname.startsWith('/en') ? 'TV Schedule' : 'ТВ Расписание'}</Link></li>
                <li><Link href={pathname.startsWith('/en') ? '/en/odds' : '/odds'}>{pathname.startsWith('/en') ? 'Odds' : 'Котировки'}</Link></li>
                <li><Link href={pathname.startsWith('/en') ? '/en/photo' : '/photo'}>{pathname.startsWith('/en') ? 'Photogallery' : 'Фотогалерея'}</Link></li>
                <li><Link href={pathname.startsWith('/en') ? '/en/vk-feed' : '/vk-feed'}>{pathname.startsWith('/en') ? 'VK Feed' : 'Лента ВК'}</Link></li>
                <li><Link href={pathname.startsWith('/en') ? '/en/tags' : '/tags'}>{pathname.startsWith('/en') ? 'Tags' : 'Теги'}</Link></li>
            </ul>
        </li>
    );
};

export default Others;