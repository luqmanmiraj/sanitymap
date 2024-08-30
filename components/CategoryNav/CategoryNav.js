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

const CategoryNav = ({ events }) => (
    <div className="w-full  p-4">
   {/*    <div className="text-left mb-6 font-semibold text-black">584 results</div> */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
        {events.map((event, index) => (
          <div key={index} className="category flex flex-col items-start cursor-pointer transition-colors duration-200 relative">
            <div className="w-full h-[250px] mb-4 relative">
              <img src={event.image ? event.image : 'https://via.placeholder.com/2070x1380'} alt={event.title} className="w-full h-full object-cover rounded-xl" />
              <div className="absolute top-2 right-2 bg-[#079EA5] text-[#FFFFFF] rounded-full px-3 py-1 text-xs font-semibold text-black" style={{ width: '103px', height: '32px', padding: '8px 12px', gap: '4px', borderRadius: '99px' }}>
                {/* {category.match} Match */}
              </div>
            </div>
            <span className="text-lg font-bold text-left text-black">{event.title}</span>
            <span className="text-sm text-left text-gray-500">{event.date}</span>
            <span className="text-md font-bold text-left text-black w-full mt-2 flex items-center">Discover <span className="inline-block transform rotate-45 pl-2"> ↑</span></span>
          </div>
        ))}
      </div>
    </div>
  
);

export default CategoryNav;
