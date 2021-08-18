import React from 'react';
import { connect } from 'react-redux';
import ReactJson from 'react-json-view';

import { getIdToken, getTokenResponse } from '../../redux/selector/userSelector';

class Info extends React.PureComponent {
  render() {
    const { idToken, tokenResponse } = this.props;
    return (
      <div className="container home-container">
        <h1 className="ht-id">HT ID - Demo app</h1>
        <br />
        <h2>Token Response</h2>
        <div className="card token-request-block">
          <ReactJson src={tokenResponse} collapseStringsAfterLength={50} />
        </div>
        <h2>ID Token</h2>
        <div className="card token-request-block">
          <ReactJson src={idToken} collapseStringsAfterLength={50} />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    idToken: getIdToken(state),
    tokenResponse: getTokenResponse(state),
  }),
  (dispatch) => ({}),
)(Info);
