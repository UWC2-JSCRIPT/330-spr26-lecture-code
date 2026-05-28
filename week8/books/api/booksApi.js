/* eslint-disable no-unused-vars */
const getBookViews = async (_name, _author) => {
  const res = await fetch('https://csrng.net/csrng/csrng.php?min=1&max=900');
  const data = await res.json();
  return data[0].random;
};

const actions = {
  getBookViews,
};

export default actions;