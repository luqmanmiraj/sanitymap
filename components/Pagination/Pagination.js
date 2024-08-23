import React from 'react';

const Pagination = () => (
  <div className="flex justify-center items-center space-x-1" style={{ backgroundColor: '#FFFFFF' }}>
    <button className="px-3 py-1 rounded-md text-black font-bold text-2xl flex items-center justify-center" style={{ lineHeight: '1' }}>&lt;</button>
    <button className="px-3 py-1 rounded-md bg-teal-500 text-white">1</button>
    <button className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 text-black">2</button>
    <button className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 text-black">3</button>
    <span className="px-3 py-1 text-black">...</span>
    <button className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 text-black">10</button>
    <button className="px-3 py-1 rounded-md text-black font-bold text-2xl flex items-center justify-center" style={{ lineHeight: '1' }}>&gt;</button>
  </div>
);

export default Pagination;