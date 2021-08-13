import React from 'react';
import { Redirect, Router } from '@reach/router';
import { Provider } from 'react-redux';

import LoginPage from './components/login/LoginPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/store';
import AuthPage from './components/AuthenticatedPage';
import Home from './components/home/Home';
import './i18n/config';
import { HOME_URL, LOGIN_URL, LOGOUT_URL } from './constants/authentication';
import Home2 from './components/home/Home2';
import LogoutPage from './components/login/LogoutPage';

function App() {
  return (
    <div className="body container" style={{ background: '#FFFFFF' }}>
      <Provider store={store}>
        <Router>
          <LoginPage path={LOGIN_URL} />
          <LogoutPage path={LOGOUT_URL} />
          <AuthPage default path={HOME_URL}>
            <Redirect from="/" to={HOME_URL} noThrow />
            <Home path={HOME_URL} />
            <Home2 path="/home2" />
          </AuthPage>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
