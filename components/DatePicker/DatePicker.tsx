import { useState, useEffect } from 'react';
import './DatePicker.css';

const DatePicker: React.FC = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

    useEffect(() => {
        const url = new URL(window.location.href);
        const dateRange = url.searchParams.get('dateRange');
        if (dateRange) {
            const [start, end] = dateRange.split('_');
            setStartDate(new Date(start));
            setEndDate(new Date(end));
        }
    }, []);

    const handleDateClick = (date: Date) => {
        const url = new URL(window.location.href);

        url.searchParams.set('dateRange', ``);
        window.history.pushState({}, '', url.pathname + url.search);
        url.searchParams.delete('month');
        window.history.pushState({}, '', url.pathname + url.search);
        url.searchParams.delete('season');
        window.history.pushState({}, '', url.pathname + url.search);

        if (!startDate || (startDate && endDate)) {
            setStartDate(date);
            setEndDate(null);
        } else if (startDate && !endDate) {
            if (date < startDate) {
                setEndDate(startDate);
                setStartDate(date);
                url.searchParams.set('dateRange', `${date.toISOString().split('T')[0]}_${startDate.toISOString().split('T')[0]}`);
                window.history.pushState({}, '', url.pathname + url.search);

            } else {
                setEndDate(date);
                url.searchParams.set('dateRange', `${startDate.toISOString().split('T')[0]}_${date.toISOString().split('T')[0]}`);
                window.history.pushState({}, '', url.pathname + url.search);
            }
        }
    };

    const renderDays = (month: number, year: number) => {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const days = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="day empty"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isFirstSelected = startDate && date.toDateString() === startDate.toDateString();
            const isLastSelected = endDate && date.toDateString() === endDate.toDateString();
            const isSelected = isFirstSelected || isLastSelected;
            const isInRange = startDate && endDate && date > startDate && date < endDate;
            days.push(
                <div
                    key={day}
                    className={`text-black font-medium day ${isSelected ? 'selected' : ''} ${isFirstSelected ? 'rounded-s' : ''} ${isLastSelected ? 'rounded-e' : ''} ${isInRange ? 'in-range' : ''
                        }  ${isInRange && startDate && (date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) < 7 && date.getDay() === 6 ? 'rounded-se' : ''
                        } ${isInRange && endDate && (endDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24) < 7 && date.getDay() === 6 ? 'rounded-ee' : ''
                        } ${isInRange && date.getDate() <= 7 && date.getDay() === 6 ? 'rounded-se' : ''
                        }
                    ${isInRange && date.getDate() >= new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() && date.getDay() === 6 ? 'rounded-ee' : ''
                        }
                    ${isInRange && date.getDate() <= 7 && date.getDay() === 0 ? 'rounded-ss' : ''
                        }
                    ${isInRange &&
                            ((endDate && (endDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24) < 7 && date.getDay() === 0) ||
                                (date.getDate() >= new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() - 6 && date.getDay() === 0))
                            ? 'rounded-es' : ''
                        }
                    `}
                    onClick={() => handleDateClick(date)}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    const renderMonth = (month: number, year: number) => (
        <div className="w-[100%] md:w-[48%]">
            <div className="text-center text-black font-bold mb-2">
                {new Date(year, month).toLocaleString('default', { month: 'long' })} {year}
            </div>
            <div className="grid grid-cols-7 ">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                    <div key={day} className="text-center text-gray-600 text-sm items-center p-2 cursor-pointer text-black">{day}</div>
                ))}
                {renderDays(month, year)}
            </div>
        </div>
    );

    const handlePreviousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    return (
        <div className='data-range-picker-wrapper'>
            <div className="date-range-picker">
                <div className="flex space-between cursor-pointer mb-4">
                    <div onClick={handlePreviousMonth} className="text-gray-600 hover:text-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </div>
                </div>
                <div className='overflow-y-auto h-[40vh] md:h-auto'>
                    <div className="flex flex-col md:flex-row justify-between">
                        {renderMonth(currentMonth, currentYear)}
                        {renderMonth((currentMonth + 1) % 12, currentMonth === 11 ? currentYear + 1 : currentYear)}

                    </div>
                </div>
                <div className="flex justify-between cursor-pointer mb-4">
                    <div onClick={handleNextMonth} className="text-gray-600 hover:text-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatePicker;
