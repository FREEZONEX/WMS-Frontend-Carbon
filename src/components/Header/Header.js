'use client';
import React, { useContext } from 'react';
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
  Theme,
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
  Analytics,
  WatsonHealth3DCursor,
} from '@carbon/icons-react';
import { usePathname } from 'next/navigation';
import { ThemeContext } from '@/utils/ThemeContext';
import { useRouter } from 'next/navigation';

export const HeaderWSideNav = ({ isExpanded, toggleSideNavExpanded }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useContext(ThemeContext);
  const isCurrentPath = (path) => {
    return process.env.PATH_PREFIX + path === pathname;
  };
  console.log(isExpanded);

  return (
    <Header aria-label="SUPCON WMS">
      <SkipToContent />
      <HeaderMenuButton
        aria-label={isExpanded ? 'Close menu' : 'Open menu'}
        onClick={toggleSideNavExpanded}
        isActive={isExpanded}
        aria-expanded={isExpanded}
      />
      <HeaderName
        prefix="SUPCON"
        onClick={() => {
          router.push(`${process.env.PATH_PREFIX}/home`);
        }}
        className="cursor-pointer"
      >
        WMS
      </HeaderName>
      <Theme theme={theme.sideNavTheme}>
        <SideNav
          aria-label="Side navigation"
          expanded={isExpanded}
          addFocusListeners={false}
          className="w-10"
          onOverlayClick={() => {}}
        >
          <SideNavItems isSideNavExpanded={isExpanded}>
            <SideNavLink
              renderIcon={IbmDb2Warehouse}
              isSideNavExpanded={isExpanded}
              onClick={() => {
                router.push(`${process.env.PATH_PREFIX}/warehouse`);
              }}
              className="cursor-pointer"
              isActive={isCurrentPath('/warehouse')}
            >
              Warehouse
            </SideNavLink>
            <SideNavLink
              isSideNavExpanded={isExpanded}
              renderIcon={Product}
              onClick={() => {
                router.push(`${process.env.PATH_PREFIX}/warehouse/material`);
              }}
              className="cursor-pointer"
              isActive={isCurrentPath('/warehouse/material')}
            >
              Material
            </SideNavLink>
            <SwitcherDivider />
            <SideNavLink
              isSideNavExpanded={isExpanded}
              renderIcon={PortInput}
              onClick={() => {
                router.push(`${process.env.PATH_PREFIX}/operation/inbound`);
              }}
              className="cursor-pointer"
              isActive={isCurrentPath('/operation/inbound')}
            >
              Inbound
            </SideNavLink>
            <SideNavLink
              isSideNavExpanded={isExpanded}
              renderIcon={PortOutput}
              onClick={() => {
                router.push(`${process.env.PATH_PREFIX}/operation/outbound`);
              }}
              className="cursor-pointer"
              isActive={isCurrentPath('/operation/outbound')}
            >
              Outbound
            </SideNavLink>
            <SideNavLink
              isSideNavExpanded={isExpanded}
              renderIcon={InventoryManagement}
              onClick={() => {
                router.push(`${process.env.PATH_PREFIX}/operation/stocktaking`);
              }}
              className="cursor-pointer"
              isActive={isCurrentPath('/operation/stocktaking')}
            >
              Auditing
            </SideNavLink>
            <SwitcherDivider />
            <SideNavLink
              isSideNavExpanded={isExpanded}
              renderIcon={Analytics}
              onClick={() => {
                router.push(`${process.env.PATH_PREFIX}/analysis`);
              }}
              className="cursor-pointer"
              isActive={isCurrentPath('/analysis')}
            >
              Analysis
            </SideNavLink>
            <SideNavLink
              isSideNavExpanded={isExpanded}
              renderIcon={WatsonHealth3DCursor}
              onClick={() => {
                router.push(`${process.env.PATH_PREFIX}/analysis/3d`);
              }}
              className="cursor-pointer"
              isActive={isCurrentPath('/analysis/3d')}
            >
              3D-Modeling
            </SideNavLink>
          </SideNavItems>
        </SideNav>
      </Theme>
      <HeaderGlobalBar className="flex items-center">
        <Toggle
          labelA="Light"
          labelB="Dark"
          className="mr-[2rem]"
          size="sm"
          id="theme-toggle"
          toggled={theme.headerTheme === 'g100'}
          onToggle={(e) => {
            console.log(e);
            if (e) {
              setTheme({
                headerTheme: 'g100',
                contentTheme: 'g10',
                sideNavTheme: 'g90',
              });
            } else {
              setTheme({
                headerTheme: 'white',
                contentTheme: 'white',
                sideNavTheme: 'white',
              });
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
