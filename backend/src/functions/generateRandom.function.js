/**
 * These are functions to be used in tests
 */

const { format } = require('date-fns');

const generateFunctions = {
  generateRandomDate() {
    const startDate = new Date(1900, 0, 1);
    const endDate = new Date();

    const randomDate =
      startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime());

    return format(randomDate, 'dd/MM/yyyy');
  },
  generateRandomTime() {
    const startDate = new Date(1900, 0, 1);
    const endDate = new Date();

    const randomDate =
      startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime());

    return format(randomDate, 'HH:mm');
  },
};

module.exports = generateFunctions;
