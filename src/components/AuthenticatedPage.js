import React from 'react';
import { connect } from 'react-redux';

import requiredAuthenticated from './requiredAuthenticated';
import LeftMenu from './layout/authenticated/left-menu';
import TopBar from './layout/authenticated/top-bar';

function AuthenticatedPage(props) {
  const { children } = props;
  return (
    <div className="wrapper d-flex flex-row">
      <LeftMenu />
      <div className="main-content flex-fill">
        <TopBar />
        <div className="content py-1 py-sm-3 px-2 px-sm-4">{children}</div>
      </div>
    </div>
  );
}

export default requiredAuthenticated(
  connect(
    () => ({}),
    () => ({}),
  )(AuthenticatedPage),
);
