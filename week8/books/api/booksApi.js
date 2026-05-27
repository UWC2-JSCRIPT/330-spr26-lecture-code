/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
export const getBookViews = async (_name, _author) => {
  const res = await fetch('https://csrng.net/csrng/csrng.php?min=1&max=900');
  const data = await res.json();
  return data[0].random;
};
