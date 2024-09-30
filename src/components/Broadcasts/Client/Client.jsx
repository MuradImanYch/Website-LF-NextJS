'use client';

import './Client.css';
import { useState } from 'react';
import Video from 'next-video';
import Image from 'next/image';

const Client = ({ broadcast }) => {
  const [thread, setThread] = useState(0);

  const switchThr = (index) => {
    setThread(index);
  };

  // Проверяем, что broadcast и broadcast[0].broadcastLink существуют и являются строкой
  if (!broadcast || !broadcast[0] || !broadcast[0].broadcastLink || typeof broadcast[0].broadcastLink !== 'string') {
    return <p>Трансляция начнется позже</p>;
  }

  return (
    <>
      <ul className="threads">
        {broadcast[0].broadcastLink.split(' ').map((e, i) => (
          <li className={i === thread ? 'current' : ''} onClick={() => switchThr(i)} key={'thread' + i}>
            Поток {i + 1} <Image src={e.split('_flag_')[1]} width={'20'} height={'20'} placeholder={'empty'} />
          </li>
        ))}
      </ul>

      <div className="video-content">
        <Video className="video" src={broadcast[0].broadcastLink.split(' ')[thread].split('_flag_')[0]} />
      </div>
    </>
  );
};

export default Client;