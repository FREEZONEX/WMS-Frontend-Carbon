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
  OverflowMenu,
  OverflowMenuItem,
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
import {
  ACCOUNT_TYPE,
  ISLOGIN,
  sysTitle,
  sysTitleShort,
  USER_NAME,
} from '@/utils/constants';

export const HeaderWSideNav = ({ isExpanded, toggleSideNavExpanded }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useContext(ThemeContext);
  const isCurrentPath = (path) => {
    return process.env.PATH_PREFIX + path === pathname;
  };

  const [screenWidth, setScreenWidth] = useState(0);
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    const userName = window.localStorage.getItem(USER_NAME);
    setUserName(userName);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(ISLOGIN, false);
      window.localStorage.setItem(ACCOUNT_TYPE, '0');
      window.localStorage.setItem(USER_NAME, '');
      router.replace('/login');
    }
  };

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
            <SideNavLink
              isSideNavExpanded={isExpanded}
              renderIcon={DocumentTasks}
              onClick={() => {
                router.push(`${process.env.PATH_PREFIX}/operation/task`);
              }}
              className="cursor-pointer"
              isActive={isCurrentPath('/operation/task')}
            >
              Task
            </SideNavLink>
            <SideNavLink
              isSideNavExpanded={isExpanded}
              renderIcon={IbmEngineeringSystemsDesignRhapsodySn2}
              onClick={() => {
                router.push(`${process.env.PATH_PREFIX}/operation/task/rules`);
              }}
              className="cursor-pointer"
              isActive={isCurrentPath('/operation/task/rules')}
            >
              Rule
            </SideNavLink>
            <SideNavLink
              isSideNavExpanded={isExpanded}
              renderIcon={GroupResource}
              onClick={() => {
                router.push(
                  `${process.env.PATH_PREFIX}/operation/task/resource`
                );
              }}
              className="cursor-pointer"
              isActive={isCurrentPath('/operation/task/resource')}
            >
              Resource
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
        <HeaderGlobalAction aria-label="User" tooltipAlignment="right">
          <OverflowMenu
            flipped={true}
            renderIcon={User}
            menuOffsetFlip={{ top: 5, left: -55 }}
          >
            {userName && (
              <OverflowMenuItem itemText={userName}></OverflowMenuItem>
            )}
            <OverflowMenuItem itemText="Logout" onClick={handleLogout} />
          </OverflowMenu>
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Info" tooltipAlignment="end">
          <Information size={20} />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  );
};
