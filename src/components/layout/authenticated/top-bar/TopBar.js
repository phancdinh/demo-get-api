import React from 'react';
import { dispatchLogout } from '../../../../actions/sign-out';
import Language from '../../language';
import logoOutIcon from './images/fi_log-out.svg';

export default function TopBar() {
  function handleLogoutBtnClick() {
    dispatchLogout();
  }
  return (
    <div className="top-menu d-flex col-12 justify-content-end px-3 py-2">
      <div className="d-flex px-2">
        <div className="px-4 d-flex align-items-center">
          <Language />
        </div>

        <div className="d-flex px-4 align-items-center">
          <button
            type="button"
            className="bg-transparent border-0 login-btn"
            onClick={() => handleLogoutBtnClick()}
          >
            <img src={logoOutIcon} alt="Logout" />
          </button>
        </div>
      </div>
    </div>
  );
}
