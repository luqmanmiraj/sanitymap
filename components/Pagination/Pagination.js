import React from 'react';

const Pagination = ({ totalPosts, currentPage, handlePageChange }) => {
  const totalPages = Math.ceil(totalPosts / 6);
  const buttons = [];
  for (let i = 1; i <= totalPages; i++) {
    buttons.push(
      <button 
        key={i} 
        className={`px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 ${currentPage === i ? 'bg-teal-500 text-white' : 'text-black'}`}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </button>
    );
  }
  return (
    <div className="flex justify-center items-center space-x-1" style={{ backgroundColor: '#FFFFFF' }}>
      <button 
        className="px-3 py-1 rounded-md text-black font-bold text-2xl flex items-center justify-center" 
        style={{ lineHeight: '1' }}
        onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
      >
        &lt;
      </button>
      {buttons}
      <button 
        className="px-3 py-1 rounded-md text-black font-bold text-2xl flex items-center justify-center" 
        style={{ lineHeight: '1' }}
        onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
