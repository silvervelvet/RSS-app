import React from 'react';

interface PaginationProps {
  elementsPerPage: number;
  total: number;
  currentPage: number;
  handlePageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  elementsPerPage,
  total,
  currentPage,
  handlePageChange,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(total / elementsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <button
          key={number}
          disabled={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
