//src/utils/validation/parsePaginationParams.js

import { parseNumber } from './parseNumber.js';

export const validatePadinationParams = (query) => {
  const page = parseNumber(query.page, 1);
  const perPage = parseNumber(query.perPage, 4);

  return {
    page,
    perPage,
  };
};
