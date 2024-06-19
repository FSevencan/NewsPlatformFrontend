"use client"
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dynamic from 'next/dynamic';

const CalendarWithNoSSR = dynamic(
  () => import('react-calendar'),
  { ssr: false }
);

const DatePickerComponents = () => {
    const [value, onChange] = useState(new Date());

    return (
        <div>
            <CalendarWithNoSSR onChange={onChange} value={value} />
        </div>
    );
};

export default DatePickerComponents;