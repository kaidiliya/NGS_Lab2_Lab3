/**
 * Return the factorial of i.
 * @param {number} i - an integer number.
 * @return {number} the factorial of i.
 */
export const factorial = function (i) {

  if (!Number.isInteger(i) || i < 0) {
    throw new Error('factorial expects a non-negative integer');
  }

  let result = 1;
  for (let n = 2; n <= i; n++) {
    result *= n;
  }
  return result;
};

export default factorial;
