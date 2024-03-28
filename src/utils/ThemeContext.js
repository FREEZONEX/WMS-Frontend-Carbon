'use client';
import React, { createContext, useState } from 'react';

const ThemeContext = createContext({
  theme: { headerTheme: 'white', contentTheme: 'white' },
  setTheme: () => {},
});

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    headerTheme: 'white',
    contentTheme: 'white',
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
