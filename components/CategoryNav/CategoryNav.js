import React from 'react';
import Map from '../Map/Map';

const categories = [
  { match: '80%', name: 'The Adventure Group Whistler', location: 'Whistler, BC', image: 'https://via.placeholder.com/2070x1380' },
  { match: '92.7%', name: 'Apex Adventure Plex', location: 'Richmond, BC', image: 'https://via.placeholder.com/2070x1380' },
  { match: '40%', name: 'BC Adventure Company', location: 'North Vancouver, BC', image: 'https://via.placeholder.com/2070x1380' },
  { match: '20%', name: 'Canadian Wilderness Adventures', location: 'Whistler, BC', image: 'https://via.placeholder.com/2070x1380' },
  { match: '20%', name: 'Dragon Boat BC', location: 'Vancouver, BC', image: 'https://via.placeholder.com/2070x1380' },
  { match: 'N/A', name: 'DVC Ventures', location: 'Port Coquitlam, BC', image: 'https://via.placeholder.com/2070x1380' },
];

const CategoryNav = () => (
  <div className="flex flex-col lg:flex-row w-full" style={{ backgroundColor: '#FFFFFF' }}>
    <div className="w-full lg:w-2/3 p-4">
   {/*    <div className="text-left mb-6 font-semibold text-black">584 results</div> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="category flex flex-col items-start cursor-pointer transition-colors duration-200 relative">
            <div className="w-full h-[250px] mb-4 relative">
              <img src={category.image} alt={category.name} className="w-full h-full object-cover rounded-xl" />
              <div className="absolute top-2 right-2 bg-[#079EA5] text-[#FFFFFF] rounded-full px-3 py-1 text-xs font-semibold text-black" style={{ width: '103px', height: '32px', padding: '8px 12px', gap: '4px', borderRadius: '99px' }}>
                {category.match} Match
              </div>
            </div>
            <span className="text-lg font-bold text-left text-black">{category.name}</span>
            <span className="text-sm text-left text-gray-500">{category.location}</span>
            <span className="text-md font-bold text-left text-black w-full mt-2 flex items-center">Discover <span className="inline-block transform rotate-45 pl-2"> ↑</span></span>
          </div>
        ))}
      </div>
    </div>
    <div className="w-full lg:w-1/3 p-2">
      <div className="w-full h-[500px] sm:w-[436px] sm:h-[750px] rounded-[32px] overflow-hidden">
        <Map />
      </div>
    </div>
  </div>
);

export default CategoryNav;