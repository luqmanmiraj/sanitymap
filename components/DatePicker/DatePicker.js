
import { useState } from 'react';
import './DatePicker.css';

const DatePicker = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleDateClick = (date) => {
        if (!startDate || (startDate && endDate)) {
            setStartDate(date);
            setEndDate(null);
        } else if (startDate && !endDate) {
            if (date < startDate) {
                setEndDate(startDate);
                setStartDate(date);
            } else {
                setEndDate(date);
            }
        }
    };

    const renderDays = (month, year) => {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const days = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="day empty"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isSelected = (startDate && date.toDateString() === startDate.toDateString()) ||
                               (endDate && date.toDateString() === endDate.toDateString());
            const isInRange = startDate && endDate && date > startDate && date < endDate;

            days.push(
                <div
                    key={day}
                    className={`day ${isSelected ? 'selected' : ''} ${isInRange ? 'in-range' : ''}`}
                    onClick={() => handleDateClick(date)}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    const renderMonth = (month, year) => (
        <div className="w-[45%]">
            <div className="text-center font-bold mb-2">{new Date(year, month).toLocaleString('default', { month: 'long' })} {year}</div>
            <div className="grid grid-cols-7 ">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                    <div key={day} className="text-center p-2 cursor-pointer">{day}</div>
                ))}
                {renderDays(month, year)}
            </div>
        </div>
    );

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return (
        <div className="date-range-picker">
            {renderMonth(currentMonth, currentYear)}
            {renderMonth(currentMonth + 1, currentYear)}
        </div>
    );
};

export default DatePicker;