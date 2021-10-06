/**
 * convert number into a usd amount (example : 26561.54 => $26,561.54).
 * @memberof utils
 * @param {number} amount - the number to convert
 * @returns {string} - the formated number as usd amount
 */
export const toUsCurrency = (amount) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(amount);
};
