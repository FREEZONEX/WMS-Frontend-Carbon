'use client';

import React, { useState, useEffect } from 'react';
import { HeaderWSideNav } from '@/components/Header/Header';
import { Content, Theme } from '@carbon/react';

export function Providers({ children }) {
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(true);
  function toggleSideNavExpanded() {
    setIsSideNavExpanded(!isSideNavExpanded);
  }
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme
      ? JSON.parse(storedTheme)
      : { headerTheme: 'white', contentTheme: 'white' };
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
    document.documentElement.dataset.carbonTheme = theme;
  }, [theme]);

  return (
    <>
      <Theme theme={theme.headerTheme}>
        <HeaderWSideNav
          theme={theme}
          setTheme={setTheme}
          isSideNavExpanded={isSideNavExpanded}
          toggleSideNavExpanded={toggleSideNavExpanded}
        />
      </Theme>
      <Theme theme={theme.contentTheme}>
        <Content
          className={`pt-20 h-screen transition-[margin-left] duration-110 ease-in-out ${
            isSideNavExpanded ? 'ml-52' : 'ml-0'
          }`}
        >
          {children}
        </Content>
      </Theme>
    </>
  );
}
