import React, { useState, useEffect } from 'react';
import Map from '../Map/Map';

interface EventsProps {
  events: any[];
  loading: boolean;
  budget: string;
  explorerTypes: string[];
  languages: string[];
  accessibility: string[];
}

const Events: React.FC<EventsProps> = ({ events, loading, budget, explorerTypes, languages, accessibility }) => {

  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    // Trigger the fade-in animation after component mounts
    if (events.length > 0) {
      const timer = setTimeout(() => {
        setFadeIn(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [events]);

  const calculateMatchPercentage = (event: any, budget = '', explorerTypes: string[] = [], languages: string[] = [], accessibility: string[] = []) => {
    let totalCriteria = 0;
    let matchedCriteria = 0;
    const explorerTypesArray = explorerTypes.filter(value => value != '');
    const languagesArray = languages.filter(value => value != '');
    const accessibilityArray = accessibility.filter(value => value != '');
    const criteriaTypes = [budget, explorerTypesArray.length > 0, languagesArray.length > 0, accessibilityArray.length > 0];
    const totalTypes = criteriaTypes.filter(Boolean).length;

    // Check budget
    if (budget) {
        totalCriteria++;
        if (event.budget?.toLocaleLowerCase() === budget.toLocaleLowerCase()) {
            matchedCriteria++;
        }
    }
    // Check explorerTypes
    if (explorerTypesArray.length > 0) {
        totalCriteria++;
        const eventExplorerTypes = event.Explorer || [];
        const matchedExplorerTypes = explorerTypesArray.filter(type => eventExplorerTypes.map((e: string) => e.toLowerCase()).includes(type.toLowerCase()));
        const explorerTypesMatchPercentage = (matchedExplorerTypes.length / explorerTypesArray.length) * 100;
        matchedCriteria += (explorerTypesMatchPercentage / 100);
    }

    // Check languages  
    if (languagesArray.length > 0) {
        totalCriteria++;
        const eventLanguages = event.Language || [];
        const matchedLanguages = languagesArray.filter(lang => eventLanguages.map((e: string) => e.toLowerCase()).includes(lang.toLowerCase()));
        const languagesMatchPercentage = (matchedLanguages.length / languagesArray.length) * 100;
        matchedCriteria += (languagesMatchPercentage / 100);
    }

    // Check accessibility
    if (accessibilityArray.length > 0) {
        totalCriteria++;
        const eventAccessibility = event.Accessibility || [];
        const matchedAccessibility = accessibilityArray.filter(acc => eventAccessibility.map((e: string) => e.toLowerCase()).includes(acc.toLowerCase()));
        const accessibilityMatchPercentage = (matchedAccessibility.length / accessibilityArray.length) * 100;
        matchedCriteria += (accessibilityMatchPercentage / 100);
    }
    // Calculate the match percentage
    const percentage = totalTypes > 0 ? (matchedCriteria / totalTypes) * 100 : 0;
    return Math.round(percentage);
  };

  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 ">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className=" hover:scale-105 transition-transform category flex flex-col items-start cursor-pointer transition-colors duration-200 relative">
              <div className="w-full h-[250px] mb-4 bg-gray-300 animate-pulse rounded-xl"></div>
              <div className="w-3/4 h-6 bg-gray-300 animate-pulse rounded mb-2"></div>
              <div className="w-1/2 h-4 bg-gray-300 animate-pulse rounded"></div>
            </div>
          ))
        ) : (
          events?.length > 0 && events.map((event, index) => (
            <div key={index} className={` hover:scale-105 transition-transform duration-300 category flex flex-col items-start cursor-pointer transition-opacity transform ease-in-out duration-300 ${fadeIn ? `opacity-100` : 'opacity-0'}`} style={{ transitionDelay: `${(index + 1) * 100}ms` }}>
              <div className="w-full h-[250px] mb-4 relative">
                <img src={event.imageUrl ? event.imageUrl : 'https://via.placeholder.com/2070x1380'} alt={event.title} className="w-full h-full object-cover rounded-xl" loading="lazy" />
                {
                  (!(calculateMatchPercentage(event, budget, explorerTypes, languages, accessibility) == 0)) &&
                  <div className="absolute top-2 right-2 bg-[#D3E172] text-[#04341D]  rounded-full px-3 py-1 text-xs font-semibold  flex" style={{ width: '123px', height: '32px', padding: '8px 12px', gap: '4px', borderRadius: '99px' }}>
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.286 8.94227C12.3672 8.94227 13.2438 8.05803 13.2438 6.96726C13.2438 5.87649 12.3672 4.99225 11.286 4.99225C10.2047 4.99225 9.32812 5.87649 9.32812 6.96726C9.32812 8.05803 10.2047 8.94227 11.286 8.94227Z" stroke="#04341D" stroke-width="1.33333" />
                      <path d="M10.1116 10.8514H12.4953C13.8522 10.8514 14.9794 11.844 15.2018 13.1486C15.2899 13.666 14.8985 14.1401 14.3779 14.1401H8.22905C7.70838 14.1401 7.31704 13.666 7.40512 13.1486C7.62755 11.844 8.75474 10.8514 10.1116 10.8514Z" stroke="#04341D" stroke-width="1.33333" />
                      <path d="M9.39755 7.4149L5.99077 10.8516L1.50152 6.36623L1.49539 6.36004C0.756747 5.63517 0.484148 4.5532 0.790195 3.56009C1.09624 2.56697 1.92853 1.83198 2.94479 1.65708C3.79938 1.51031 4.66233 1.7808 5.28112 2.3679L5.30453 2.39152L5.97516 3.07703L6.66307 2.40951L6.69373 2.37971C7.28241 1.82185 8.0924 1.5508 8.90519 1.65371L9.04121 1.67452C10.0491 1.85391 10.8747 2.58553 11.1796 3.57134C11.3653 4.1708 11.3396 4.80289 11.1278 5.36974" stroke="#04341D" stroke-width="1.33333" />
                    </svg>
                    {calculateMatchPercentage(event, budget, explorerTypes, languages, accessibility)}% Match
                  </div>
                }
              </div>

              <span className="text-lg font-bold text-left text-black font-[24px]" style={{ fontFamily: 'Nohemi bold' }}>{event.title}</span>
              <span className="text-sm text-left text-gray-500">{event.address ? event.address : 'Whistler, BC'}</span>
              <span className="text-md font-bold text-left text-black w-full mt-2 flex items-center font-[14px]">Discover
                <span className="inline-block pl-2">
                  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clip-rule="evenodd" d="M10.8171 5.17151L7.24201 1.59905C6.90867 1.26596 6.90867 0.741347 7.24117 0.416587C7.56617 0.0835004 8.09117 0.0835004 8.42451 0.415755L13.4245 5.41206C13.6336 5.61566 13.7082 5.90889 13.6482 6.17863C13.6054 6.37751 13.4909 6.55059 13.3333 6.66931L8.41633 11.5827C8.25799 11.7326 8.04133 11.8242 7.82466 11.8242L7.83299 11.8333C7.60799 11.8333 7.39133 11.7417 7.24133 11.5918C6.90799 11.2671 6.90799 10.7341 7.23299 10.4094V10.4011L10.7997 6.83694L1.16671 6.83694C0.700041 6.83694 0.333374 6.46222 0.333374 6.00423C0.333374 5.5379 0.700041 5.17151 1.16671 5.17151L10.8171 5.17151Z" fill="black" />
                  </svg>
                </span>
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Events;
