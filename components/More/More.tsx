import React, { useState, useEffect } from 'react';

const Preferences: React.FC = () => {
  const [explorerTypes, setExplorerTypes] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>('Low-cost');
  const [accessibility, setAccessibility] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);

  const updateUrlParams = (key: string, values: string[]) => {
    const url = new URL(window.location.href);
    if (values.length > 0) {
      url.searchParams.set(key, values.join(','));
    } else {
      url.searchParams.delete(key);
    }
    window.history.pushState({}, '', url.toString());
  };

  const handleUpdateSorting = () => {
    console.log('update sorting');
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const explorerTypesFromUrl = url.searchParams.get('explorerTypes')?.split(',') || [];
    const budgetFromUrl = url.searchParams.get('budget') || 'Low-cost';
    const accessibilityFromUrl = url.searchParams.get('accessibility')?.split(',') || [];
    const languagesFromUrl = url.searchParams.get('languages')?.split(',') || [];

    setExplorerTypes(explorerTypesFromUrl);
    setBudget(budgetFromUrl);
    setAccessibility(accessibilityFromUrl);
    setLanguages(languagesFromUrl);
  }, []);

  useEffect(() => {
    updateUrlParams('explorerTypes', explorerTypes);
  }, [explorerTypes]);

  useEffect(() => {
    updateUrlParams('budget', [budget]);
  }, [budget]);

  useEffect(() => {
    updateUrlParams('accessibility', accessibility);
  }, [accessibility]);

  useEffect(() => {
    updateUrlParams('languages', languages);
  }, [languages]);

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
    <div className=" bg-white rounded-lg px-2 overflow-y-auto max-h-[65vh]">
      <div className='sticky top-0 left-0 w-1/2 bg-white'>
      <h2 className="text-2xl text-black font-bold mb-4">Preferences</h2>
      </div>
      <div className="mb-6">
        <h3 className="text-xl text-black font-semibold mb-2">Explorer Type</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 text-black gap-2">
          {['Foodie', 'Adventurer', 'Family Focused', 'Outdoorsy', '2SLGBTQIA+', 'Romantic', 'Arts & Culture Fan', 'Business Traveller', 'Hipster', 'Luxury Traveller', 'Accessible Traveller', 'Cruise Traveller', 'Eco-Conscious', 'Pet Owner', 'Day Tripper'].map(type => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 accent-[#079EA5]"
                checked={explorerTypes.includes(type)}
                onChange={() => handleCheckboxChange(setExplorerTypes, type)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-300 my-4"></div>
      <div className="mb-6">
        <h3 className="text-xl text-black font-semibold mb-2">Budget</h3>
        <div className="flex items-center text-black bg-gray-200 rounded-full cursor-pointer">
          {['Free', 'Low-cost', 'Medium', 'High'].map((option, index) => (
            <label key={option} className={`flex items-center justify-center  flex-grow ${
              ['Free', 'Low-cost', 'Medium', 'High'].indexOf(option) <= ['Free', 'Low-cost', 'Medium', 'High'].indexOf(budget)
               ? 'bg-[#079EA5] text-white' : 'bg-gray-200 text-black'} p-2  ${index === 3 ? 'rounded-r-full' : ''} ${index === 0 ? 'rounded-l-full' : ''} ${option === budget ? 'rounded-r-full' : ''}`}>
              <input
                type="radio"
                className="hidden"
                value={option}
                checked={budget === option}
                onChange={handleBudgetChange}
              />
              <span className="flex items-center cursor-pointer">
                {option === 'Free' && <span className="mr-2">-</span>}
                {option === 'Low-cost' && <span className="mr-2">💰</span>}
                {option === 'Medium' && <span className="mr-2">📷</span>}
                {option === 'High' && <span className="mr-2">💎</span>}
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-300 my-4"></div>

      <div className="mb-6">
        <h3 className="text-xl text-black font-semibold mb-2">Accessibility</h3>
        <div className="grid grid-cols-3 text-black gap-2">
          {['Wheelchair accessible', 'Accessible parking', 'Accessible washroom', 'Braille signage', 'Assistive listening devices'].map(option => (
            <label key={option} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 accent-[#079EA5]"
                checked={accessibility.includes(option)}
                onChange={() => handleCheckboxChange(setAccessibility, option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-300 my-4"></div>

      <div className="mb-6">
        <h3 className="text-xl text-black font-semibold mb-2">Language offered</h3>
        <div className="grid grid-cols-3 text-black gap-2">
          {['English', 'Spanish', 'Mandarin', 'French', 'Cantonese'].map(language => (
            <label key={language} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 accent-[#079EA5]"
                checked={languages.includes(language)}
                onChange={() => handleCheckboxChange(setLanguages, language)}
              />
              {language}
            </label>
          ))}
        </div>
      </div>
      <div className='sticky bottom-0 left-0 bg-white w-full'>
      <div className="border-t border-gray-300 my-4"></div>
      <div className="flex text-black justify-between">
        <button onClick={handleClearAll} className="px-4 py-2 font-bold rounded">Clear all</button>
        <button onClick={handleUpdateSorting} className="px-4 py-2 bg-black text-white rounded">Update Sorting</button>
      </div>
      </div>
    </div>
  );
};

export default Preferences;
