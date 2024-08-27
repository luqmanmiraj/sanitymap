import React, { useState } from 'react';

const travellers = [
  { label: 'Solo', icon: '👤' },
  { label: 'Couple', icon: '👥' },
  { label: 'Family', icon: '👶' },
  { label: 'Friends', icon: '👨‍👩‍👧‍👦' },
];

const ChooseTravellers = () => {
  const [selectedTravellers, setSelectedTravellers] = useState<string[]>([]);

  const handleTravellerClick = (label: string) => {
    const updatedTravellers = selectedTravellers.includes(label)
      ? selectedTravellers.filter(traveller => traveller !== label)
      : [...selectedTravellers, label];

    setSelectedTravellers(updatedTravellers);

    const url = new URL(window.location.href);
    url.searchParams.set('travellers', updatedTravellers.map(traveller => traveller.toLowerCase()).join(','));
    window.history.pushState({}, '', url.pathname + url.search);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-xl font-bold">Choose your travellers</h2>
      </div>
      <div className="flex justify-around w-full mt-4">
        {travellers.map((traveller) => (
          <div
            key={traveller.label}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleTravellerClick(traveller.label)}
          >
            <div
              className={`flex items-center justify-center w-16 h-16 rounded-full text-3xl ${
                selectedTravellers.includes(traveller.label) ? 'bg-teal-500 text-white' : 'bg-gray-500 text-white'
              }`}
            >
              {traveller.icon}
            </div>
            <span className="mt-2 text-black">{traveller.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseTravellers;