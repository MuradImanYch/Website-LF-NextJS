import Image from "next/image";
import './Others.css';

import arrowBottom from '../../../../../public/assets/ico/arrow-bottom.webp';

const Others = () => {
    return (
        <li className="others">
            <a href="#">Ещё <Image placeholder={'blur'} width={10} src={arrowBottom} alt="Развернуть" title="Развернуть" /></a>
            <ul>
                <li className="transfer-news"><a href="#">Новости трансферов</a></li>
                <li className="transfer-transfers"><a href="#">Список переходов</a></li>
                <li><a href="#">Оффтопы</a></li>
                <li><a href="#">Блоги</a></li>
                <li><a href="#">Видео</a></li>
                <li><a href="#">Рейтинг УЕФА</a></li>
                <li><a href="#">Рейтинг ФИФА</a></li>
                <li><a href="#">ТВ Расписание</a></li>
                <li><a href="#">Котироаки</a></li>
            </ul>
        </li>
    );
};

export default Others;