export const parseBoolean = (value) => {
  if (!['true', 'false'].includes(value)) return;
  return value === 'true' ? true : false;
};
