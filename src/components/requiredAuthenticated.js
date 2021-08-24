import React from 'react';
import { Redirect } from '@reach/router';
import { connect } from 'react-redux';

function requiredAuthenticated(WrappedComponent) {
  function requiredLogin(props) {
    const { user, location, ...rest } = props;
    const { isAuthenticated } = user;
    const { pathname } = location;
    const loginUrl = pathname ? `/login?ref=${pathname}` : '/login';
    if (!isAuthenticated) {
      return <Redirect to={loginUrl} noThrow />;
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
