import PropTypes from "prop-types";

// eslint-disable-next-line import/prefer-default-export
export const meta = PropTypes.shape({
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  date: PropTypes.string,
  readTime: PropTypes.number,
  author: PropTypes.string,
  slug: PropTypes.string.isRequired,
  image: PropTypes.string,
  alt: PropTypes.string,
  series: PropTypes.string,
  seriesId: PropTypes.string,
}).isRequired;
