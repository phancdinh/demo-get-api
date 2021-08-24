import React from 'react';
import { Redirect, Router } from '@reach/router';
import { Provider } from 'react-redux';

import LoginPage from './components/login';
import './scss/profile.scss';
import store from './redux/store';
import AuthPage from './components/AuthenticatedPage';
import Home from './components/home/Home';
import TokenInfo from './components/token-info/Info';
import './i18n/config';
import { HOME_URL, LOGIN_URL, LOGOUT_URL } from './constants/authentication';
import LogoutPage from './components/login/LogoutPage';

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty('--app-height', `${window.innerHeight}px`);
};
window.addEventListener('resize', appHeight);
appHeight();

function App() {
  return (
    <Provider store={store}>
      <Router className="body">
        <LoginPage path={LOGIN_URL} />
        <LogoutPage path={LOGOUT_URL} />
        <AuthPage default path={HOME_URL}>
          <Redirect from="/" to={HOME_URL} noThrow />
          <Home path={HOME_URL} />
          <TokenInfo path="/token" />
          {/* <NotFound default /> */}
        </AuthPage>
      </Router>
    </Provider>
  );
}

export default App;
