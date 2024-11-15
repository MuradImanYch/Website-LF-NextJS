'use client';

import { useEffect, useState } from 'react';

const DateComponent = ({ dateProps, placement }) => {
    const [date, setDate] = useState(null);

    useEffect(() => {
        if (dateProps) {
            setDate(new Date(dateProps)); // Преобразуем строку даты в объект Date
        }
    }, [dateProps]); // Добавляем зависимость от dateProps

    if (!date) return null; // Если нет даты, ничего не отображаем

    // Форматируем дату
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');

    return (
        <>
            {/* {day}-{month}-{year} | {hours}:{minutes} */}
            {placement === 'broadcasts' ? `${hours + ':' + minutes}` : placement === 'api-client-date' ? `${year}-${month}-${day}` : `${day + '-' + month + '-' + year + ' | ' + hours + ':' + minutes}`}
        </>
    );
};

export default DateComponent;