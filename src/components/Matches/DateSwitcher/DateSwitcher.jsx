'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import './DateSwitcher.css';

const DateSwitcher = ({ pathnameDate, placement }) => {
  const today = new Date();
  const [dateState, setDateState] = useState(pathnameDate || today.toISOString().split('T')[0]);
  const router = useRouter();
  const pathname = usePathname();

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDateState(newDate);
    router.push(pathname.startsWith('/en') ? placement === 'all' ? `/en/matches/${newDate}` : null || placement === 'ended' ? `/en/matches/results/${newDate}` : null || placement === 'scheduled' ? `/en/matches/fixtures/${newDate}` : null : router.push(placement === 'all' ? `/matches/${newDate}` : null || placement === 'ended' ? `/matches/results/${newDate}` : null || placement === 'scheduled' ? `/matches/fixtures/${newDate}` : null));
  };

  const handleArrowClick = (days) => {
    const currentDate = new Date(dateState);
    currentDate.setDate(currentDate.getDate() + days);
    const newDate = currentDate.toISOString().split('T')[0];
    setDateState(newDate);
    router.push(pathname.startsWith('/en') ? placement === 'all' ? `/en/matches/${newDate}` : null || placement === 'ended' ? `/en/matches/results/${newDate}` : null || placement === 'scheduled' ? `/en/matches/fixtures/${newDate}` : null : router.push(placement === 'all' ? `/matches/${newDate}` : null || placement === 'ended' ? `/matches/results/${newDate}` : null || placement === 'scheduled' ? `/matches/fixtures/${newDate}` : null));
  };

  const getFormattedDate = (offset) => {
    const date = new Date(dateState);
    date.setDate(date.getDate() + offset);
    return date.getDate(); // Возвращает только число дня
  };

  return (
    <div className='date-switcher'>
      {/* Кнопки с числами для перемещения на 2 и 1 день назад */}
      <button onClick={() => handleArrowClick(-2)} className="arrow-button double-left-arrow">
        {getFormattedDate(-2)}
      </button>
      <button onClick={() => handleArrowClick(-1)} className="arrow-button left-arrow">
        {getFormattedDate(-1)}
      </button>
      {/* Кнопки со стрелками для перемещения на 1 день */}
      <button onClick={() => handleArrowClick(-1)} className="arrow-button left-arrow">
        {'<'}
      </button>
      <input
        type='date'
        value={dateState}
        onChange={handleDateChange}
      />
      {/* Кнопки со стрелками для перемещения на 1 день */}
      <button onClick={() => handleArrowClick(1)} className="arrow-button right-arrow">
        {'>'}
      </button>
      {/* Кнопки с числами для перемещения на 1 и 2 дня вперед */}
      <button onClick={() => handleArrowClick(1)} className="arrow-button right-arrow">
        {getFormattedDate(1)}
      </button>
      <button onClick={() => handleArrowClick(2)} className="arrow-button double-right-arrow">
        {getFormattedDate(2)}
      </button>
    </div>
  );
};

export default DateSwitcher;