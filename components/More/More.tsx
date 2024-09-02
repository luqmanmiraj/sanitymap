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
        <h2 className="text-2xl text-black font-bold mb-4 font-serif" >Preferences</h2>
      </div>
      <div className="mb-6">
        <h3 className="text-xl text-black font-semibold mb-2 font-serif">Explorer Type</h3>
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
        <h3 className="text-xl text-black font-semibold mb-2 font-serif">Budget</h3>
        <div className="flex items-center text-black bg-gray-200 rounded-full cursor-pointer">
          {['Free', 'Low-cost', 'Medium', 'High'].map((option, index) => (  
            <label key={option} className={`flex flex-col items-center justify-center transition-colors ease-in-out duration-100 flex-grow ${['Free', 'Low-cost', 'Medium', 'High'].indexOf(option) <= ['Free', 'Low-cost', 'Medium', 'High'].indexOf(budget)
                ? 'bg-[#079EA5] text-white' : 'bg-gray-200 text-[#77787C]'} p-2 ${index === 3 ? 'rounded-r-full' : ''} ${index === 0 ? 'rounded-l-full' : ''} ${option === budget ? 'rounded-r-full' : ''}`}>
              <input
                type="radio"
                className="hidden"
                value={option}
                checked={budget === option}
                onChange={handleBudgetChange}
              />
              <span className="flex items-center cursor-pointer">
                {option === 'Free' && <span className="mr-2"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8334 9.1665C16.2936 9.1665 16.6667 9.5396 16.6667 9.99984C16.6667 10.4272 16.345 10.7794 15.9306 10.8276L15.8334 10.8332H4.16671C3.70647 10.8332 3.33337 10.4601 3.33337 9.99984C3.33337 9.57247 3.65507 9.22025 4.06952 9.17211L4.16671 9.1665H15.8334Z" fill="currentColor" />
                </svg>
                </span>}
                {option === 'Low-cost' && <span className="mr-2"><svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.54167 5C4.54167 3.61929 5.66095 2.5 7.04167 2.5H10.375C11.7557 2.5 12.875 3.61929 12.875 5C12.875 6.15289 12.0946 7.12351 11.0333 7.41243C11.1462 7.69742 11.2083 8.00813 11.2083 8.33333C11.2083 8.77888 11.0918 9.1972 10.8875 9.55947C11.0467 9.66133 11.1935 9.78073 11.3253 9.91494C10.8653 10.2363 10.4731 10.6481 10.1746 11.1246C10.0218 10.9463 9.79491 10.8333 9.54167 10.8333H6.20833C5.7481 10.8333 5.375 11.2064 5.375 11.6667C5.375 12.1269 5.7481 12.5 6.20833 12.5H9.54167C9.57009 12.5 9.59818 12.4986 9.62587 12.4958C9.57066 12.7664 9.54167 13.0465 9.54167 13.3333C9.54167 14.5136 10.0324 15.5792 10.8209 16.3373C10.3776 17.0362 9.59715 17.5 8.70833 17.5H5.375C3.99429 17.5 2.875 16.3807 2.875 15C2.875 14.1148 3.33508 13.337 4.02916 12.8928C3.82488 12.5305 3.70833 12.1122 3.70833 11.6667C3.70833 11.2211 3.82489 10.8028 4.02916 10.4405C3.33508 9.9963 2.875 9.21855 2.875 8.33333C2.875 7.18044 3.65539 6.20982 4.71674 5.9209C4.60376 5.63591 4.54167 5.32521 4.54167 5ZM8.70833 7.5C9.16857 7.5 9.54167 7.8731 9.54167 8.33333C9.54167 8.79357 9.16857 9.16667 8.70833 9.16667H5.375C4.91476 9.16667 4.54167 8.79357 4.54167 8.33333C4.54167 7.8731 4.91476 7.5 5.375 7.5H8.70833ZM10.375 5.83333H7.04167C6.58143 5.83333 6.20833 5.46024 6.20833 5C6.20833 4.53976 6.58143 4.16667 7.04167 4.16667H10.375C10.8352 4.16667 11.2083 4.53976 11.2083 5C11.2083 5.46024 10.8352 5.83333 10.375 5.83333ZM8.70833 14.1667C9.16857 14.1667 9.54167 14.5398 9.54167 15C9.54167 15.4602 9.16857 15.8333 8.70833 15.8333H5.375C4.91476 15.8333 4.54167 15.4602 4.54167 15C4.54167 14.5398 4.91476 14.1667 5.375 14.1667H8.70833Z" fill="currentColor" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7084 10.8332C12.3277 10.8332 11.2084 11.9525 11.2084 13.3332C11.2084 14.7139 12.3277 15.8332 13.7084 15.8332C15.0891 15.8332 16.2084 14.7139 16.2084 13.3332C16.2084 11.9525 15.0891 10.8332 13.7084 10.8332ZM9.54175 13.3332C9.54175 11.032 11.4072 9.1665 13.7084 9.1665C16.0096 9.1665 17.8751 11.032 17.8751 13.3332C17.8751 15.6344 16.0096 17.4998 13.7084 17.4998C11.4072 17.4998 9.54175 15.6344 9.54175 13.3332Z" fill="currentColor" />
                </svg>
                </span>}
                {option === 'Medium' && <span className="mr-2"><svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.6208 5.6866C15.5448 4.37426 14.4565 3.3335 13.1251 3.3335H4.79175L4.64485 3.33774C3.33251 3.41378 2.29175 4.5021 2.29175 5.8335V10.8335L2.29599 10.9804C2.37203 12.2927 3.46035 13.3335 4.79175 13.3335H5.62508V14.1668C5.62508 15.5475 6.74437 16.6668 8.12508 16.6668H16.4584C17.8391 16.6668 18.9584 15.5475 18.9584 14.1668V9.16683C18.9584 7.78612 17.8391 6.66683 16.4584 6.66683H15.6251V5.8335L15.6208 5.6866ZM13.9584 6.66683V5.8335C13.9584 5.40613 13.6367 5.05391 13.2223 5.00577L13.1251 5.00016H4.79175C4.36438 5.00016 4.01216 5.32186 3.96402 5.73631L3.95841 5.8335V10.8335C3.95841 11.2609 4.28011 11.6131 4.69456 11.6612L4.79175 11.6668H5.62508V9.16683C5.62508 7.78612 6.74437 6.66683 8.12508 6.66683H13.9584ZM7.29175 12.5002V9.16683C7.29175 8.70659 7.66484 8.3335 8.12508 8.3335H14.7917H16.4584C16.9187 8.3335 17.2917 8.70659 17.2917 9.16683V14.1668C17.2917 14.6271 16.9187 15.0002 16.4584 15.0002H8.12508C7.66484 15.0002 7.29175 14.6271 7.29175 14.1668V12.5002ZM9.79175 11.6668C9.79175 10.2861 10.911 9.16683 12.2917 9.16683C13.6725 9.16683 14.7917 10.2861 14.7917 11.6668C14.7917 13.0475 13.6725 14.1668 12.2917 14.1668C10.911 14.1668 9.79175 13.0475 9.79175 11.6668ZM13.1251 11.6668C13.1251 11.2066 12.752 10.8335 12.2917 10.8335C11.8315 10.8335 11.4584 11.2066 11.4584 11.6668C11.4584 12.1271 11.8315 12.5002 12.2917 12.5002C12.752 12.5002 13.1251 12.1271 13.1251 11.6668Z" fill="currentColor" />
                </svg>

                </span>}
                {option === 'High' && <span className="mr-2"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0001 3.3335C15.2562 3.3335 15.4959 3.45108 15.6527 3.64863L15.7147 3.73808L18.2147 7.90475C18.3838 8.18661 18.37 8.53802 18.188 8.80391L18.1211 8.88916L11.012 16.8334C10.7455 17.1053 10.3808 17.2586 10.0001 17.2586C9.66695 17.2586 9.34607 17.1412 9.07527 16.9113L8.96239 16.8058L1.87906 8.88916C1.65988 8.64419 1.60724 8.29647 1.7359 8.00107L1.78551 7.90475L4.2965 3.72009L4.34983 3.64562C4.38801 3.59805 4.43131 3.55475 4.47888 3.51657L4.55335 3.46324L4.62661 3.42176L4.66817 3.40238L4.71904 3.38208L4.80902 3.35551L4.90291 3.3391L5.00009 3.3335H15.0001ZM14.5284 5.00016H5.47092L3.53009 8.23516L9.99926 15.466L16.4693 8.23516L14.5284 5.00016ZM7.5955 6.61892C7.20085 6.38213 6.68897 6.5101 6.45218 6.90475L5.95218 7.73808L5.90228 7.83505C5.77305 8.13245 5.82755 8.48254 6.05014 8.72739L7.71681 10.5607L7.79193 10.6337C8.10638 10.9032 8.57963 10.9026 8.89398 10.6168L8.96696 10.5417C9.23641 10.2272 9.23582 9.75395 8.95004 9.4396L7.69926 8.06433L7.88133 7.76224L7.92653 7.67602C8.09848 7.29587 7.96196 6.8388 7.5955 6.61892Z" fill="currentColor" />
                </svg>
                </span>}
              </span>
            </label>
          ))}
          
        </div>
        <div className="flex items-center text-black bg-transparent rounded-full cursor-pointer">
          {['Free', 'Low-cost', 'Medium', 'High'].map((option, index) => (  
            <label key={option} className={`flex flex-col items-center justify-center  flex-grow  p-2 ${index === 3 ? 'rounded-r-full' : ''} ${index === 0 ? 'rounded-l-full' : ''} ${option === budget ? 'rounded-r-full' : ''}`}>
              
              <span className="flex items-center cursor-pointer">
                {option}
              </span>
            </label>
          ))}
          
        </div>
  
      
      </div>
      <div className="border-t border-gray-300 my-4"></div>

      <div className="mb-6">
        <h3 className="text-xl text-black font-semibold mb-2 font-serif">Accessibility</h3>
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
        <h3 className="text-xl text-black font-semibold mb-2 font-serif">Language offered</h3>
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
