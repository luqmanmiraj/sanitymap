import React, { useState } from 'react';

const AdventurePreferences: React.FC = () => {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([
    'Adrenaline',
    'Camping',
    'Cycling & mountain biking',
    'Golfing',
  ]);

  const activities = [
    'Adrenaline',
    'Camping',
    'Cycling & mountain biking',
    'Golfing',
    'Hiking',
    'Skiing & snowboarding',
    'Water Sports',
  ];

  const handleCheckboxChange = (activity: string) => {
    setSelectedActivities(prevState =>
      prevState.includes(activity)
        ? prevState.filter(item => item !== activity)
        : [...prevState, activity]
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg max-w-xs">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-teal-600">ADVENTURE</h2>
        <button className="text-xl font-bold text-gray-600">&times;</button>
      </div>
      <div className="space-y-2">
        {activities.map(activity => (
          <label key={activity} className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedActivities.includes(activity)}
              onChange={() => handleCheckboxChange(activity)}
            />
            {activity}
          </label>
        ))}
      </div>
      <button className="mt-4 w-full py-2 bg-white border border-black rounded-lg flex items-center justify-between px-4">
        <span className="font-bold">BE INSPIRED</span>
        <span className="font-bold text-teal-600">Adventure</span>
        <span className="text-xl font-bold text-teal-600">&rarr;</span>
      </button>
    </div>
  );
};

export default AdventurePreferences;
