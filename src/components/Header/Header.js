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
  SwitcherDivider,
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
} from '@carbon/icons-react';

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
              <SideNavLink renderIcon={Analytics} href="/analysis">
                Analysis
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
