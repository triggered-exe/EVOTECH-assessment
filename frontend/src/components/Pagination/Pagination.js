import React from 'react';
import styles from './Pagination.module.css'; // Import the CSS module

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={styles.pagination}> {/* Use the styles object */}
        {pageNumbers.map((number) => (
          <li key={number} className={styles.pageItem}> {/* Use the styles object */}
          <span onClick={() => onPageChange(number)}
              href="!#"
              className={number === currentPage ? styles.active : ''} >
                {number}
          </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
