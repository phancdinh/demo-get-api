import React from 'react';
import { connect } from 'react-redux';
import ReactJson from 'react-json-view';

import { getIdToken } from '../../redux/selector/userSelector';
import { dispatchLogout } from '../../actions/sign-out';

class Home extends React.PureComponent {
  /**
   * Handles logout button click
   */
  handleLogoutBtnClick = () => {
    dispatchLogout();
  };

  render() {
    const { idToken } = this.props;
    // TODO: update for next task
    return (
      <div className="container home-container">
        <h1 className="ht-id">HT ID - Demo app</h1>
        <br />
        <h2>ID Token</h2>
        <div className="card token-request-block">
          <ReactJson src={idToken} collapseStringsAfterLength={50} />
        </div>
        <button type="button" className="btn btn-danger" onClick={this.handleLogoutBtnClick}>
          LOGOUT
        </button>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    idToken: getIdToken(state),
  }),
  (dispatch) => ({}),
)(Home);
