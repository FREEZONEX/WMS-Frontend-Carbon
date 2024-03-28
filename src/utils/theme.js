// utils/theme.js
import Cookies from 'js-cookie';

export const getInitialTheme = () => {
  const storedTheme = Cookies.get('theme');
  return storedTheme
    ? JSON.parse(storedTheme)
    : { headerTheme: 'white', contentTheme: 'white' };
};

export const setThemeCookie = (theme) => {
  Cookies.set('theme', JSON.stringify(theme));
};
