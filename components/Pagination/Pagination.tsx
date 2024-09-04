import React from 'react';

interface PaginationProps {
  totalPosts: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
  postsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPosts, currentPage, handlePageChange, postsPerPage }) => {
  if (totalPosts <= postsPerPage) {
    return null;
  }

  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const buttons: JSX.Element[] = [];

  const createButton = (page: number) => (
    <button
      key={page}
      className={`px-3 py-1 font-bold  rounded-md border border-gray-300 ${currentPage === page ? 'bg-teal-500 text-white' : ' text-[#77787C] hover:bg-gray-100'}`}
      onClick={() => handlePageChange(page)}
    >
      {page}
    </button>
  );

  if (totalPages <= 5) {
    // Show all pages if total pages are 5 or less
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(createButton(i));
    }
  } else {
    // Show the first page
    buttons.push(createButton(1));

    if (currentPage > 3) {
      // Show dots if currentPage is greater than 3
      buttons.push(<span key="dots1" className="px-3 py-1 text-[#77787C] text-2xl">...</span>);
    }

    // Show pages around the current page
    const startPage = Math.max(2, currentPage > totalPages - 3 ? totalPages - 4 : currentPage - 1);
    const endPage = Math.min(totalPages - 1, (currentPage + (currentPage >= 5 ? 1 : 5 - currentPage)));
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(createButton(i));
    }

    if (currentPage < totalPages - 2) {
      // Show dots if currentPage is less than totalPages - 2
      buttons.push(<span key="dots2" className="px-3 py-1 text-[#77787C] text-2xl">...</span>);
    }

    // Show the last page
    buttons.push(createButton(totalPages));
  }

  return (
    <div className="flex justify-left ml-5 lg:justify-center items-center space-x-1" style={{ backgroundColor: '#FFFFFF' }}>
      <button
        className={`px-3 py-1 rounded-md text-black font-bold text-2xl flex items-center justify-center ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        style={{ lineHeight: '1' }}
        onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {buttons}
      <button
        className={`px-3 py-1 rounded-md text-black font-bold text-2xl flex items-center justify-center ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        style={{ lineHeight: '1' }}
        onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
