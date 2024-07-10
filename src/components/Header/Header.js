'use client';
import React, { useContext, useEffect, useState } from 'react';
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
  DocumentTasks,
  GroupResource,
  IbmEngineeringSystemsDesignRhapsodySn2,
} from '@carbon/icons-react';
import { usePathname } from 'next/navigation';
import { ThemeContext } from '@/utils/ThemeContext';
import { useRouter } from 'next/navigation';
import { sysTitle, sysTitleShort } from '@/utils/constants';

export const HeaderWSideNav = ({ isExpanded, toggleSideNavExpanded }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useContext(ThemeContext);
  const isCurrentPath = (path) => {
    return process.env.PATH_PREFIX + path === pathname;
  };

  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Header aria-label={sysTitle}>
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
        className="cursor-pointer uppercase"
      >
        {screenWidth < 640 ? sysTitleShort : sysTitle}
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
          </SideNavItems>
        </SideNav>
      </Theme>
      <HeaderGlobalBar className="flex items-center">
        <HeaderGlobalAction aria-label="Settings">
          <Settings size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="User">
          <User size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Info" tooltipAlignment="end">
          <Information size={20} />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  );
};
