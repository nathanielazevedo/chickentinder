const localUrl = 'http://localhost:5173/';
const prodUrl = 'thechickentinder.com/';

export const getBaseUrl = () => {
  return process.env.NODE_ENV === 'development' ? localUrl : prodUrl;
};

export const toMiles = (km: number) => {
  const miles = km / 1609.34;
  return Math.floor(miles);
};
