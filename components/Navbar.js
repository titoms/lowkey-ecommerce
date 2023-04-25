import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ShoppingCartIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  Cog8ToothIcon,
  ChevronRightIcon,
  UserCircleIcon,
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/solid';
import { CSSTransition } from 'react-transition-group';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Store } from '@/utils/Store';

export default function Navbar(props) {
  return (
    <nav className="navbar flex h-12 justify-between px-4 shadow-md items-center">
      <Link href="/" className="text-lg font-bold">
        Lowkey
      </Link>
      <ul className="navbar-nav">
        <NavItem icon={<UserIcon />}>
          <DropDownMenu />
        </NavItem>
        <NavItem icon={<ArrowRightOnRectangleIcon />} />
      </ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState();
  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}

function DropDownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  // Calculate height of the Reference of the menu (menu principal) + 20 for the padding
  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + 20);
  }, []);

  // Calculate height of the incoming dropdown + 20 for padding
  function calcHeight(el) {
    const height = el.offsetHeight + 20;
    setMenuHeight(height);
  }

  function DropDownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'main'}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropDownItem leftIcon={<ShoppingCartIcon />}>My Orders</DropDownItem>
          <DropDownItem
            leftIcon={<Cog8ToothIcon />}
            rightIcon={<ChevronRightIcon />}
            goToMenu="settings"
          >
            Settings
          </DropDownItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'settings'}
        unmountOnExit
        timeout={500}
        classNames="menu-settings"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropDownItem leftIcon={<ArrowLeftIcon />} goToMenu="main">
            Go Back
          </DropDownItem>
          <DropDownItem leftIcon={<UserCircleIcon />}>
            Profile Settings
          </DropDownItem>
          <DropDownItem leftIcon={<AdjustmentsHorizontalIcon />}>
            Account Settings
          </DropDownItem>
        </div>
      </CSSTransition>
    </div>
  );
}
