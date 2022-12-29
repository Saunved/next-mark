/* eslint-disable import/prefer-default-export */

const getSplitDate = (date) => date.split("-");

/**
 *
 * @param {string} date - Date in YYYY-MM-DD format
 */
export const humanReadableDate = (date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [year, month, day] = getSplitDate(date);

  return `${String(+day)} ${months[+month - 1]}, ${year}`;
};
