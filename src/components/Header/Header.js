'use client';

import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderMenuButton,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink,
  SwitcherDivider,
  IconButton,
} from '@carbon/react';

import {
  IbmDb2Warehouse,
  Product,
  InventoryManagement,
  PortInput,
  PortOutput,
  User,
  Information,
  Settings,
  Help,
  Analytics,
  WatsonHealth3DCursor,
  Menu,
} from '@carbon/icons-react';
import { usePathname } from 'next/navigation';

export const HeaderWSideNav = ({
  isSideNavExpanded,
  toggleSideNavExpanded,
}) => {
  const pathname = usePathname();
  const isCurrentPath = (path) => {
    return path === pathname;
  };
  return (
    <Header aria-label="SUPCON WMS">
      <SkipToContent />
      <HeaderMenuButton
        aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
        onClick={toggleSideNavExpanded}
        isActive={isSideNavExpanded}
        aria-expanded={isSideNavExpanded}
      />
      <HeaderName href="/" prefix="SUPCON">
        WMS
      </HeaderName>
      <SideNav
        aria-label="Side navigation"
        expanded={isSideNavExpanded}
        onSideNavBlur={toggleSideNavExpanded}
        href="#main-content"
      >
        <SideNavItems>
          <SideNavLink
            renderIcon={IbmDb2Warehouse}
            href="/warehouse"
            isActive={isCurrentPath('/warehouse')}
          >
            Warehouse
          </SideNavLink>
          <SideNavLink
            renderIcon={Product}
            href="/warehouse/material"
            isActive={isCurrentPath('/warehouse/material')}
          >
            Material
          </SideNavLink>
          <SwitcherDivider />
          <SideNavLink
            renderIcon={PortInput}
            href="/operation/inbound"
            isActive={isCurrentPath('/operation/inbound')}
          >
            Inbound
          </SideNavLink>
          <SideNavLink
            renderIcon={PortOutput}
            href="/operation/outbound"
            isActive={isCurrentPath('/operation/outbound')}
          >
            Outbound
          </SideNavLink>
          <SideNavLink
            renderIcon={InventoryManagement}
            href="/operation/stocktaking"
            isActive={isCurrentPath('/operation/stocktaking')}
          >
            Stocktaking
          </SideNavLink>
          <SwitcherDivider />
          <SideNavLink
            renderIcon={Analytics}
            href="/analysis"
            isActive={isCurrentPath('/analysis')}
          >
            Analysis
          </SideNavLink>
          <SideNavLink
            renderIcon={WatsonHealth3DCursor}
            href="/analysis/3d"
            isActive={isCurrentPath('/analysis/3d')}
          >
            3D-Modeling
          </SideNavLink>
        </SideNavItems>
      </SideNav>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Settings">
          <Settings size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="User">
          <User size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Info" tooltipAlignment="end">
          <Information size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Info" tooltipAlignment="end">
          <Help size={20} />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
    //     </>
    //   )}
    // />
  );
};
