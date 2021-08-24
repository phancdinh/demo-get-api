import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@reach/router';

const NavLink = (props) => {
  const { className } = props;
  return (
    <Link
      {...props}
      getProps={({ isCurrent }) => {
        // the object returned here is passed to the
        // anchor element's props
        return {
          className: isCurrent ? `${className} active` : className,
        };
      }}
    />
  );
};

function LeftMenuItem(props) {
  const { menuItem } = props;
  return (
    <li className="nav-item">
      <NavLink
        className={`nav-link ${menuItem.icon} ${menuItem.disabled ? 'disabled' : ''}`}
        to={menuItem.to}
      >
        <span className="prefix-icon">
          <span className={menuItem.icon} />
        </span>
        <span className="message">{menuItem.text}</span>
      </NavLink>
    </li>
  );
}

export default function LeftMenu(props) {
  const { t } = useTranslation();

  const MENU_ITEMS = [
    {
      text: t('leftMenu.dashboard'),
      icon: 'dashboard',
      to: '/dashboard',
      disabled: false,
    },
    {
      text: t('leftMenu.userInfo'),
      icon: 'user-info', // TBD
      to: '/user-info',
      disabled: true,
    },
    {
      text: t('leftMenu.management'),
      icon: 'account-privacy',
      to: '/management', // TBD
      disabled: true,
    },
    {
      text: t('leftMenu.identifier'),
      icon: 'security',
      to: '/identifier', // TBD
      disabled: true,
    },
  ];
  const listItems = MENU_ITEMS.map((menu) => <LeftMenuItem key={menu.icon} menuItem={menu} />);
  return (
    <div className="left-menu flex-column" id="left-nav-bar">
      <div className="menu">
        <div className="logo-wrap d-flex justify-content-center">
          <Link className="logo" to="/">
            Logo
          </Link>
        </div>
        <ul className="nav flex-column flex-fill">{listItems}</ul>
      </div>
    </div>
  );
}
