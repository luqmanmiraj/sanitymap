import React, { useState, useEffect } from 'react';
import Map from '../Map/Map';

const CategoryNav = ({ events, loading }) => {
  console.log(events,loading)
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


  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
        {loading  ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="category flex flex-col items-start cursor-pointer transition-colors duration-200 relative">
              <div className="w-full h-[250px] mb-4 bg-gray-300 animate-pulse rounded-xl"></div>
              <div className="w-3/4 h-6 bg-gray-300 animate-pulse rounded mb-2"></div>
              <div className="w-1/2 h-4 bg-gray-300 animate-pulse rounded"></div>
            </div>
          ))
        ) : (
          events?.length>0 && events.map((event, index) => (
            <div key={index} className={`category flex flex-col items-start cursor-pointer transition-opacity transform ease-in-out duration-300 ${fadeIn ? `opacity-100` : 'opacity-0'}`}  style={{ transitionDelay: `${(index + 1) * 100}ms` }}>
              <div className="w-full h-[250px] mb-4 relative">
                <img src={event.imageUrl ? event.imageUrl : 'https://via.placeholder.com/2070x1380'} alt={event.title} className="w-full h-full object-cover rounded-xl" loading="lazy" />
                <div className="absolute top-2 right-2 bg-[#079EA5] text-[#FFFFFF] rounded-full px-3 py-1 text-xs font-semibold text-black" style={{ width: '103px', height: '32px', padding: '8px 12px', gap: '4px', borderRadius: '99px' }}>
                  {/* {category.match} Match */}
                </div>
              </div>
              <span className="text-lg font-bold text-left text-black font-[24px]" style={{fontFamily:'Nohemi bold'}}>{event.title}</span>
              <span className="text-sm text-left text-gray-500">{event.address ? event.address : 'Whistler, BC'}</span>
              <span className="text-md font-bold text-left text-black w-full mt-2 flex items-center font-[14px]">Discover 
                <span className="inline-block pl-2">
                  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8171 5.17151L7.24201 1.59905C6.90867 1.26596 6.90867 0.741347 7.24117 0.416587C7.56617 0.0835004 8.09117 0.0835004 8.42451 0.415755L13.4245 5.41206C13.6336 5.61566 13.7082 5.90889 13.6482 6.17863C13.6054 6.37751 13.4909 6.55059 13.3333 6.66931L8.41633 11.5827C8.25799 11.7326 8.04133 11.8242 7.82466 11.8242L7.83299 11.8333C7.60799 11.8333 7.39133 11.7417 7.24133 11.5918C6.90799 11.2671 6.90799 10.7341 7.23299 10.4094V10.4011L10.7997 6.83694L1.16671 6.83694C0.700041 6.83694 0.333374 6.46222 0.333374 6.00423C0.333374 5.5379 0.700041 5.17151 1.16671 5.17151L10.8171 5.17151Z" fill="black"/>
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

export default CategoryNav;
