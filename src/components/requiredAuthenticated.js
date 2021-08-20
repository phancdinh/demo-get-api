import React from 'react';
import { Redirect } from '@reach/router';
import { connect } from 'react-redux';

function requiredAuthenticated(WrappedComponent) {
  function requiredLogin(props) {
    const { user, location, ...rest } = props;
    const { isAuthenticated } = user;
    // check token expired.
    if (!isAuthenticated) {
      return <Redirect from={location.pathname} to={`/login?ref=${location.pathname}`} noThrow />;
    }
    return <WrappedComponent {...rest} />;
  }

  return connect(
    (state) => ({
      user: state.userReducer,
    }),
    () => ({}),
  )(requiredLogin);
}

export default requiredAuthenticated;
