'use client';

import React, { useState, useEffect } from 'react';
import { HeaderWSideNav } from '@/components/Header/Header';
import { Content, Theme } from '@carbon/react';

export function Providers({ children }) {
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(true);
  function toggleSideNavExpanded() {
    setIsSideNavExpanded(!isSideNavExpanded);
  }
  const [theme, setTheme] = useState({
    headerTheme: 'g100',
    contentTheme: 'g10',
  });
  useEffect(() => {
    document.documentElement.dataset.carbonTheme = theme;
  }, [theme]);

  return (
    <>
      <Theme theme={theme.headerTheme}>
        <HeaderWSideNav
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
