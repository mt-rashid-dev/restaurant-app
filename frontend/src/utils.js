export const initTheme = () => {
  const dataTheme = localStorage.getItem("dataTheme");

  if (dataTheme) return dataTheme;
  localStorage.setItem("dataTheme", "light");

  return "light";
};

export const toggleTheme = () => {
  let dataTheme = localStorage.getItem("dataTheme");

  if (dataTheme === "light") {
    dataTheme = "dark";
  } else {
    dataTheme = "light";
  }

  localStorage.setItem("dataTheme", dataTheme);
  return dataTheme;
};

export const sleep = (ms, value) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(value);
  }, ms);
});