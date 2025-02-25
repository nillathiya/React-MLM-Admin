import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="w-full max-w-[450px] mx-auto flex justify-between items-center mt-6 p-3  rounded-sm">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all border ${
          currentPage === 1
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gray-500 text-white'
        }`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex space-x-1">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-2 text-sm border rounded-md font-medium transition-all ${
              currentPage === number
                ? 'bg-gray-500 text-white'
                : 'bg-white text-gray-500'
            }`}
          >
            {number}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all border ${
          currentPage === totalPages
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gray-500 text-white'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
