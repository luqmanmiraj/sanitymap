import React, { useState } from 'react';

const months: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const Months: React.FC = () => {
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

    const handleMonthClick = (index: number) => {
        setSelectedMonth(index);
    };

    return (
        <div className="grid grid-cols-4 gap-4 justify-items-center items-center">
            {months.map((month: string, index: number) => (
                <div
                    key={month}
                    className={`p-4 text-center cursor-pointer rounded-full transition-colors duration-300 ${
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
