'use client';

import { HeaderWSideNav } from '@/components/Header/Header';
import { Content } from '@carbon/react';

export function Providers({ children }) {
  return (
    <div>
      <HeaderWSideNav />
      <Content>{children}</Content>
    </div>
  );
}
