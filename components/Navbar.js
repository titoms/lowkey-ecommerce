import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ShoppingCartIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  Cog8ToothIcon,
  ChevronRightIcon,
  UserCircleIcon,
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/solid';
import { CSSTransition } from 'react-transition-group';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Store } from '@/utils/Store';
import Cookies from 'js-cookie';

export default function Navbar() {
  const { state } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  return (
    <nav className="navbar flex h-12 justify-between px-4 shadow-md items-center">
      <Link href="/" className="text-lg font-bold">
        Lowkey
      </Link>
      <ul className="navbar-nav flex justify-between items-center">
        <NavItem icon={<UserIcon />}>
          <DropDownMenu />
        </NavItem>
        <NavItem icon={<ArrowRightOnRectangleIcon />} />

        <Link href="/cart" className="p-2">
          Cart
          {cartItemsCount > 0 && (
            <span className="ml-1 rounded-full bg-red-700 px-2 py-1 text-xs font-bold text-white">
              {cartItemsCount}
            </span>
          )}
        </Link>
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
  const { status, data: session } = useSession();
  const { dispatch } = useContext(Store);

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

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

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
          {status === 'loading' ? (
            'Loading'
          ) : session?.user ? (
            <div>
              <p className="border-b-2 mb-2 p-2 pl-0">
                Welcome again {session.user.name} !
              </p>
              <Link href="/orders">
                <DropDownItem leftIcon={<ShoppingCartIcon />}>
                  My Orders
                </DropDownItem>
              </Link>
              <DropDownItem
                leftIcon={<Cog8ToothIcon />}
                rightIcon={<ChevronRightIcon />}
                goToMenu="settings"
              >
                Settings
              </DropDownItem>
              <a href="#" onClick={logoutClickHandler}>
                <DropDownItem leftIcon={<ArrowRightOnRectangleIcon />}>
                  Logout
                </DropDownItem>
              </a>
            </div>
          ) : (
            <Link href="/login">
              <DropDownItem leftIcon={<ArrowLeftOnRectangleIcon />}>
                Login
              </DropDownItem>
            </Link>
          )}
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
          <Link href="/profile">
            <DropDownItem leftIcon={<UserCircleIcon />}>
              Profile Settings
            </DropDownItem>
          </Link>
          <Link href="/settings">
            <DropDownItem leftIcon={<AdjustmentsHorizontalIcon />}>
              Account Settings
            </DropDownItem>
          </Link>
        </div>
      </CSSTransition>
    </div>
  );
}
