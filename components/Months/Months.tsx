import React, { useState, useEffect } from 'react';

const months: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const Months: React.FC = () => {
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

    useEffect(() => {
        const url = new URL(window.location.href);
        const month = url.searchParams.get('month');
        if (month) {
            const monthIndex = months.indexOf(month);
            if (monthIndex !== -1) {
                setSelectedMonth(monthIndex);
            }
        }
    }, []);

    const handleMonthClick = (index: number) => {
        setSelectedMonth(index);
        const url = new URL(window.location.href);
        url.searchParams.set('month', months[index]);
        url.searchParams.delete('season');
        window.history.pushState({}, '', url.pathname + url.search);
    url.searchParams.delete('dateRange');
    window.history.pushState({}, '', url.pathname + url.search);
    };

    return (
        <div className="grid grid-cols-4 gap-2 justify-items-center items-center mt-10 mx-10">
            {months.map((month: string, index: number) => (
                <div
                    key={month}
                    className={`p-5 text-center text-black cursor-pointer rounded-full transition-colors duration-300 ${
                        selectedMonth === index ? 'bg-black text-white' : 'bg-transparent'
                    }`}
                    onClick={() => handleMonthClick(index)}
                >
                    {month}
                </div>
            ))}
        </div>
    );
};

export default Months;
