import { takeEvery/*, takeLatest*/ } from 'redux-saga/effects'
import sagas from 'sagas'
import actions from 'actions'

function* mySaga() {
  // profile
  yield takeEvery(actions.profile.types.CREATE, sagas.profile.create)
  yield takeEvery(actions.profile.types.LOGIN, sagas.profile.login)
  yield takeEvery(actions.profile.types.LOGOUT, sagas.profile.logout)
  yield takeEvery(actions.profile.types.GET, sagas.profile.get)
}

export default mySaga;
