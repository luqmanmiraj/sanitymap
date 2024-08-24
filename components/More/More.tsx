import React, { useState } from 'react';

const Preferences: React.FC = () => {
  const [explorerTypes, setExplorerTypes] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>('Low-cost');
  const [accessibility, setAccessibility] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);

  const handleCheckboxChange = (setState: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setState(prevState => 
      prevState.includes(value) ? prevState.filter(item => item !== value) : [...prevState, value]
    );
  };

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(event.target.value);
  };

  const handleClearAll = () => {
    setExplorerTypes([]);
    setBudget('Low-cost');
    setAccessibility([]);
    setLanguages([]);
  };

  return (
    <div className="p-6 bg-white rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Preferences</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Explorer Type</h3>
        <div className="grid grid-cols-2 gap-2">
          {['Foodie', 'Adventurer', 'Family Focused', 'Outdoorsy', '2SLGBTQIA+', 'Romantic', 'Arts & Culture Fan', 'Business Traveller', 'Hipster', 'Luxury Traveller', 'Accessible Traveller', 'Cruise Traveller', 'Eco-Conscious', 'Pet Owner', 'Day Tripper'].map(type => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={explorerTypes.includes(type)}
                onChange={() => handleCheckboxChange(setExplorerTypes, type)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Budget</h3>
        <div className="flex space-x-4">
          {['Free', 'Low-cost', 'Medium', 'High'].map(option => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                className="mr-2"
                value={option}
                checked={budget === option}
                onChange={handleBudgetChange}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
        <div className="grid grid-cols-2 gap-2">
          {['Wheelchair accessible', 'Accessible parking', 'Accessible washroom', 'Braille signage', 'Assistive listening devices'].map(option => (
            <label key={option} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={accessibility.includes(option)}
                onChange={() => handleCheckboxChange(setAccessibility, option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Language offered</h3>
        <div className="grid grid-cols-2 gap-2">
          {['English', 'Spanish', 'Mandarin', 'French', 'Cantonese'].map(language => (
            <label key={language} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={languages.includes(language)}
                onChange={() => handleCheckboxChange(setLanguages, language)}
              />
              {language}
            </label>
          ))}
        </div>
      </div>

      <div className="flex space-x-4">
        <button onClick={handleClearAll} className="px-4 py-2 bg-gray-300 rounded">Clear all</button>
        <button className="px-4 py-2 bg-black text-white rounded">Update Sorting</button>
      </div>
    </div>
  );
};

export default Preferences;
