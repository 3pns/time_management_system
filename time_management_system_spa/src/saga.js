import { takeEvery/*, takeLatest*/ } from 'redux-saga/effects'
import sagas from 'sagas'
import actions from 'actions'

function* mySaga() {
  // profile
  // yield takeEvery(actions.profile.types.CREATE, sagas.profile.create)
  yield takeEvery(actions.profile.types.LOGIN, sagas.profile.login)
  yield takeEvery(actions.profile.types.LOGOUT, sagas.profile.logout)
  yield takeEvery(actions.profile.types.RENEW, sagas.profile.renew) 
  yield takeEvery(actions.profile.types.GET, sagas.profile.get)
  yield takeEvery(actions.profile.types.PATCH, sagas.profile.patch)
  yield takeEvery(actions.profile.types.PATCH_NEW_PASSWORD, sagas.profile.patchNewPassword)

  // users
  yield takeEvery(actions.users.types.CREATE, sagas.users.create)
  yield takeEvery(actions.users.types.ALL, sagas.users.all)
  yield takeEvery(actions.users.types.GET, sagas.users.get)
  yield takeEvery(actions.users.types.PATCH, sagas.users.patch)
  yield takeEvery(actions.users.types.DELETE, sagas.users.delete)
  yield takeEvery(actions.users.types.PATCH_USER_SETTINGS, sagas.users.patchUserSettings)  
  yield takeEvery(actions.users.types.PATCH_NEW_PASSWORD, sagas.users.patchNewPassword)
  
  // time entries
  yield takeEvery(actions.time_entries.types.CREATE, sagas.time_entries.create)
  yield takeEvery(actions.time_entries.types.ALL, sagas.time_entries.all)
  yield takeEvery(actions.time_entries.types.GET, sagas.time_entries.get)
  yield takeEvery(actions.time_entries.types.PATCH, sagas.time_entries.patch)
  yield takeEvery(actions.time_entries.types.DELETE, sagas.time_entries.delete)

  // invitations
  yield takeEvery(actions.invitations.types.CREATE, sagas.invitations.create)
  yield takeEvery(actions.invitations.types.ALL, sagas.invitations.all)
  yield takeEvery(actions.invitations.types.GET, sagas.invitations.get)
  yield takeEvery(actions.invitations.types.DELETE, sagas.invitations.delete)
}


export default mySaga;
