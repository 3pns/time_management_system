import { takeEvery/*, takeLatest*/ } from 'redux-saga/effects'
import sagas from 'sagas'
import actions from 'actions'

function* mySaga() {
  // profile
  yield takeEvery(actions.profile.types.CREATE, sagas.profile.create)
  yield takeEvery(actions.profile.types.LOGIN, sagas.profile.login)
  yield takeEvery(actions.profile.types.LOGOUT, sagas.profile.logout)
  yield takeEvery(actions.profile.types.GET, sagas.profile.get)

  // users
  yield takeEvery(actions.users.types.CREATE, sagas.users.create)
  yield takeEvery(actions.users.types.ALL, sagas.users.all)
  yield takeEvery(actions.users.types.GET, sagas.users.get)
  yield takeEvery(actions.users.types.PATCH, sagas.users.patch)
  yield takeEvery(actions.users.types.DELETE, sagas.users.delete)
  
  // time entries
  yield takeEvery(actions.time_entries.types.CREATE, sagas.time_entries.create)
  yield takeEvery(actions.time_entries.types.ALL, sagas.time_entries.all)
  yield takeEvery(actions.time_entries.types.GET, sagas.time_entries.get)
  yield takeEvery(actions.time_entries.types.PATCH, sagas.time_entries.patch)
  yield takeEvery(actions.time_entries.types.DELETE, sagas.time_entries.delete)
}


export default mySaga;
