//src/utils/createPagination.js

export const createPagination = (count, page, perPage) => {
  const totalPages = Math.ceil(count / perPage);
  const hasPreviousPage =
    page > 1 && (page < totalPages || page === totalPages);
  const hasNextPage = page < totalPages;

  return {
    totalItems: count,
    totalPages,
    page,
    perPage,
    hasPreviousPage,
    hasNextPage,
  };
};
