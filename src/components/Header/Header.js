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
  Toggle,
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
} from '@carbon/icons-react';
import { usePathname } from 'next/navigation';

export const HeaderWSideNav = ({
  setTheme,
  isSideNavExpanded,
  toggleSideNavExpanded,
}) => {
  const pathname = usePathname();
  const isCurrentPath = (path) => {
    return path === process.env.PATH_PREFIX + pathname;
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
      <HeaderName href={`${process.env.PATH_PREFIX}/`} prefix="SUPCON">
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
            href={`${process.env.PATH_PREFIX}/warehouse`}
            isActive={isCurrentPath('/warehouse')}
          >
            <IbmDb2Warehouse className="mr-[1.5rem]" />
            <span>Warehouse</span>
          </SideNavLink>
          <SideNavLink
            renderIcon={Product}
            href={`${process.env.PATH_PREFIX}/warehouse/material`}
            isActive={isCurrentPath('/warehouse/material')}
          >
            Material
          </SideNavLink>
          <SwitcherDivider />
          <SideNavLink
            renderIcon={PortInput}
            href={`${process.env.PATH_PREFIX}/operation/inbound`}
            isActive={isCurrentPath('/operation/inbound')}
          >
            Inbound
          </SideNavLink>
          <SideNavLink
            renderIcon={PortOutput}
            href={`${process.env.PATH_PREFIX}/operation/outbound`}
            isActive={isCurrentPath('/operation/outbound')}
          >
            Outbound
          </SideNavLink>
          <SideNavLink
            renderIcon={InventoryManagement}
            href={`${process.env.PATH_PREFIX}/operation/stocktaking`}
            isActive={isCurrentPath('/operation/stocktaking')}
          >
            Stocktaking
          </SideNavLink>
          <SwitcherDivider />
          <SideNavLink
            renderIcon={Analytics}
            href={`${process.env.PATH_PREFIX}/analysis`}
            isActive={isCurrentPath('/analysis')}
          >
            Analysis
          </SideNavLink>
          <SideNavLink
            renderIcon={WatsonHealth3DCursor}
            href={`${process.env.PATH_PREFIX}/analysis/3d`}
            isActive={isCurrentPath('/analysis/3d')}
          >
            3D-Modeling
          </SideNavLink>
        </SideNavItems>
      </SideNav>
      <HeaderGlobalBar className="flex items-center">
        <Toggle
          labelA="Light"
          labelB="Dark"
          className="mr-[2rem]"
          size="sm"
          onToggle={(e) => {
            console.log(e);
            if (e) {
              setTheme({ headerTheme: 'g100', contentTheme: 'g10' });
            } else {
              setTheme({ headerTheme: 'white', contentTheme: 'white' });
            }
          }}
        />
        <HeaderGlobalAction aria-label="Settings">
          <Settings size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="User">
          <User size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Info" tooltipAlignment="end">
          <Information size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction
          aria-label="Info"
          tooltipAlignment="end"
        ></HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  );
};
