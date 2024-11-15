'use client';

import './Client.css';
import Video from 'next-video';
import Image from 'next/image';
import { useEffect, useState } from "react";

const Client = ({ broadcast, lang }) => {
  const [thread, setThread] = useState(0);

  const switchThr = (index) => {
    setThread(index);
  };

  const filteredBroadcastArr = broadcast[0].broadcastLink?.replace(' ', '').split(' ').filter(item => !item.includes("''"));
  const filteredReplyArr = broadcast[0].replyLink?.replace(' ', '').split(' ').filter(item => !item.includes("''"));

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Функция для добавления ведущего нуля
  const addLeadingZero = (num) => (num < 10 ? `0${num}` : num);

  // Форматируем дату матча с добавлением ведущих нулей
  const [day, month, year] = broadcast[0].date.split('.');
  const formattedDate = `${year}-${addLeadingZero(month)}-${addLeadingZero(day)}`;
  const matchDateTime = new Date(`${formattedDate}T${broadcast[0].time}:00`).getTime();

  // Применяем смещение на часовой пояс клиента
  const countdownEndTime = matchDateTime - (new Date().getTimezoneOffset() * 60000) - (15 * 60 * 1000);

  useEffect(() => {
    const timerId = setInterval(() => {
      const now = new Date().getTime();
      const distance = (countdownEndTime - now) / 1000;
      if (distance > 0) {
        const days = Math.floor(distance / 60 / 60 / 24);
        const hours = Math.floor((distance / 60 / 60) % 24);
        const minutes = Math.floor((distance / 60) % 60);
        const seconds = Math.floor(distance % 60);
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      } else {
        clearInterval(timerId);
      }
    }, 1000);
    return () => clearInterval(timerId);
  }, [countdownEndTime]);

  return (
    <>
      <ul className="threads">
        {broadcast[0].status !== 'scheduled' && (filteredReplyArr ? filteredReplyArr : filteredBroadcastArr).map((e, i) => (
          <li className={i === thread ? 'current' : ''} onClick={() => switchThr(i)} key={'thread' + i}>
            {lang === 'en' ? 'Stream ' : 'Поток '} {i + 1} <Image src={e.split('_flag_')[1]} width={'20'} height={'20'} placeholder={'empty'} alt={`${lang === 'en' ? 'Stream' : 'Поток'} ${i + 1}`} title={`${lang === 'en' ? 'Stream' : 'Поток'} ${i + 1}`} />
          </li>
        ))}
      </ul>

      <div className="video-content">
        {broadcast[0].status !== 'scheduled' && <Video className="video" src={(filteredReplyArr ? filteredReplyArr[thread] : filteredBroadcastArr[thread]).split('_flag_')[0]} />}
      </div>

      {broadcast[0].status === 'scheduled' && <p className='countdown-title'>{lang === 'en' ? 'The broadcast will begin in:' : 'Трансляция начнётся через:'}</p>}
      {broadcast[0].status === 'scheduled' && <div className="countdown">
        <div className="time">
          <div>{days}</div>
          <p>{lang === 'en' ? 'Days' : 'Дней'}</p>
        </div>
        <div className="time">
          <div>{hours}</div>
          <p>{lang === 'en' ? 'Hours' : 'Часов'}</p>
        </div>
        <div className="time">
          <div>{minutes}</div>
          <p>{lang === 'en' ? 'Minutes' : 'Минут'}</p>
        </div>
        <div className="time">
          <div>{seconds}</div>
          <p>{lang === 'en' ? 'Seconds' : 'Секунд'}</p>
        </div>
      </div>}
    </>
  );
};

export default Client;