import { all } from 'redux-saga/effects';

import userEffects from './userEffects';

export default function* rootSaga() {
  yield all([...userEffects]);
}
