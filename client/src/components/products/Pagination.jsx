import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/_Pagination.scss'; // স্টাইলের জন্য

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  // পেজ নম্বর তৈরি করার জন্য একটি সহজ যুক্তি
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  if (totalPages <= 1) {
    return null; // যদি মাত্র একটি পেজ থাকে তবে পেজিনেশন দেখানোর দরকার নেই
  }

  return (
    <nav className="pagination-container">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
            Previous
          </button>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(number)}>
              {number}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;