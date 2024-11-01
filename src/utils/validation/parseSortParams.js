//src/utils/validation/parseSortParams.js

const SORT_ORDERS = ['asc', 'desc'];
const SORT_BY_PROPERTIES = ['name'];

export const parseSortParams = (query) => {
  const sortOrder = SORT_ORDERS.includes(query.sortOrder)
    ? query.sortOrder
    : 'asc';
  const sortBy = SORT_BY_PROPERTIES.includes(query.sortBy)
    ? query.sortBy
    : 'name';
  return {
    sortOrder,
    sortBy,
  };
};
