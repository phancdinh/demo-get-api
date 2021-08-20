import React from 'react';
import { connect } from 'react-redux';

import requiredAuthenticated from './requiredAuthenticated';

function AuthenticatedPage(props) {
  const { children } = props;
  return <div>{children}</div>;
}

export default requiredAuthenticated(
  connect(
    () => ({}),
    () => ({}),
  )(AuthenticatedPage),
);
