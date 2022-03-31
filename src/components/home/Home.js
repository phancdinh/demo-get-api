import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { getIdToken } from '../../redux/selector/userSelector';
import bodyIcon from '../../assets/images/body-icon.svg';
import defaultAvatar from '../../assets/images/default-avatar.svg';
import fintechAppIcon from './images/topen-fintech.svg';
import mobileAppIcon from './images/mobile-app.svg';

const APPS = [
  {
    name: 'TopenFintech',
    icon: fintechAppIcon,
  },
  {
    name: 'HT Mobile App',
    icon: mobileAppIcon,
  },
];

function AppIcon(props) {
  const { app } = props;
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <span>
        <img src={app.icon} alt="App icon" height="128" />
      </span>
      <span className="mt-3 name text-2xl text-color-1">{app.name}</span>
    </div>
  );
}

function Home(props) {
  const { t } = useTranslation();

  const { idToken } = props;

  const listApps = APPS.map((app) => <AppIcon key={app.name} app={app} />);

  return (
    <div className="col-12 flex-column d-flex align-items-center">
      <div className="mt-2">
        <img src={defaultAvatar} alt="Default Avatar" />
      </div>
      <span className="text-4xl text-color-1 mt-2 pt-1">{idToken.name}</span>
      <div className="mt-2 pt-1">
        <img src={bodyIcon} alt="Body Icon" />
      </div>
      <div className="text-5xl text-color-2 mt-4">{t('topenx.app')}</div>
      <div className="col-12 d-flex flex-row justify-content-between my-5 pb-4" style={{ width: '25rem' }}>
        {listApps}
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    idToken: getIdToken(state),
  }),
  (dispatch) => ({}),
)(Home);
