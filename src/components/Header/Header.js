'use client';

import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
  HeaderSideNavItems,
  Switcher,
  SwitcherDivider,
  SwitcherItem,
} from '@carbon/react';

import {
  Dashboard,
  IbmDb2Warehouse,
  Product,
  InventoryManagement,
  PortInput,
  PortOutput,
  Task,
  WatsonHealth3DCursor,
  Version,
  User,
  Information,
  Settings,
  Help,
} from '@carbon/icons-react';

import Link from 'next/link';

export const HeaderWSideNav = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <>
        <Header aria-label="IBM Platform Name">
          <SkipToContent />
          <HeaderMenuButton
            aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
            aria-expanded={isSideNavExpanded}
          />
          <HeaderName href="/" prefix="SUPCON">
            WMS
          </HeaderName>
          <SideNav
            isRail
            aria-label="Side navigation"
            expanded={isSideNavExpanded}
            onSideNavBlur={onClickSideNavExpand}
            href="#main-content"
          >
            <SideNavItems>
              <SideNavLink renderIcon={IbmDb2Warehouse} href="/warehouse">
                Warehouse
              </SideNavLink>
              <SideNavLink renderIcon={Product} href="/warehouse/product">
                Product
              </SideNavLink>
              <SwitcherDivider />
              <SideNavLink renderIcon={PortInput} href="/operation/inbound">
                Inbound
              </SideNavLink>
              <SideNavLink renderIcon={PortOutput} href="/operation/outbound">
                Outbound
              </SideNavLink>
              <SideNavLink
                renderIcon={InventoryManagement}
                href="/operation/stocktaking"
              >
                Stocktaking
              </SideNavLink>
              <SwitcherDivider />
              <SideNavLink
                renderIcon={Version}
                href="https://www.carbondesignsystem.com/"
              >
                Current Stock
              </SideNavLink>
              <SideNavLink
                renderIcon={Task}
                href="https://www.carbondesignsystem.com/"
              >
                Day-to-day Task
              </SideNavLink>
              <SideNavLink renderIcon={WatsonHealth3DCursor}>
                3D Visualisation
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
      </>
    )}
  />
);
