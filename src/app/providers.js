'use client';

import React, { useState } from 'react';
import { HeaderWSideNav } from '@/components/Header/Header';
import { Content } from '@carbon/react';

export function Providers({ children }) {
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(true);
  function toggleSideNavExpanded() {
    setIsSideNavExpanded(!isSideNavExpanded);
  }
  const contentStyle = {
    marginTop: '2rem',

    transition: isSideNavExpanded
      ? 'margin-left 0.11s cubic-bezier(0.4, 0, 0.2, 1) 0s'
      : 'margin-left 0.11s cubic-bezier(0.4, 0, 0.2, 1) 0s',
    marginLeft: isSideNavExpanded ? '13rem' : '0',
  };
  return (
    <div>
      <HeaderWSideNav
        isSideNavExpanded={isSideNavExpanded}
        toggleSideNavExpanded={toggleSideNavExpanded}
      />
      <Content style={contentStyle}>{children}</Content>
    </div>
  );
}
