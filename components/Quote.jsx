import React from "react";
import PropTypes from "prop-types";

export default function Quote({ quote, author }) {
  return (
    <div className="text-xl text-gray-900 dark:text-gray-200 dark:bg-gray-800 bg-gray-100 px-4 py-4 rounded">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-400 dark:text-gray-600"
        viewBox="0 0 24 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
          fill="currentColor"
        />
      </svg>
      <p className="mt-0 pt-0 pb-0 mb-0">{quote}<br /> - {author}</p>
    </div>
  );
}

Quote.propTypes = {
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
};
