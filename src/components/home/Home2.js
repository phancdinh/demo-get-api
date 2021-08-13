import React from 'react';
import { connect } from 'react-redux';

import { dispatchLogout } from '../../actions/sign-out';

class Home2 extends React.PureComponent {
  /**
   * Handles logout button click
   */
  handleLogoutBtnClick = () => {
    dispatchLogout();
  };

  render() {
    return (
      <div className="container home-container">
        <h1 className="ht-id">HT ID - Demo app</h1>
        <br />
        <button type="button" className="btn btn-danger" onClick={this.handleLogoutBtnClick}>
          LOGOUT
        </button>
      </div>
    );
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => ({}),
)(Home2);
