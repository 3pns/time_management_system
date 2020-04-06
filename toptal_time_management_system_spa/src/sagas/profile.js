import { call, put } from 'redux-saga/effects'
import api from 'services/api'
import actions from 'actions'
import { SHOW_BOOTSTRAP_REDUX_ALERT } from 'components/BootstrapReduxAlert/actions'

class Profile {

  static * create(action) {
     try {
      console.log("wwwww")
        const profile = yield call(api.profile.create, action.payload );
        if (profile != null){
          yield put({type: actions.profile.types.UPDATE, payload: { profile: profile} });
          yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: "Sign in with success", color: "success", visible: true }});
        } else {
          console.log(profile)
          yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: "Error while sign in", color: "danger", visible: true }});
        }
     } catch (e) {
        yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: e.message, color: "danger", visible: true }});
     }
  }

  static * login(action) {
     try {
        const profile = yield call(api.profile.login, action.payload );
        if (profile != null){
          profile.authenticated = true
          yield put({type: actions.profile.types.UPDATE, payload: { profile: profile} });
          yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: "Sign in with success", color: "success", visible: true }});
        } else {
          yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: "Error while sign in", color: "danger", visible: true }});
        }
     } catch (e) {
        yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: e.message, color: "danger", visible: true }});
     }
  }

  static * logout(action) {
    yield put({type: actions.profile.types.UPDATE, payload: { profile: {authenticated: false}} });
     // try { 
     //    const profile = yield call(api.profile.logout, action.payload);
     //    if (profile != null){
     //      yield put({type: actions.profile.types.UPDATE, payload: { profile: profile} });
     //      yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: "Sign out with success", color: "success", visible: true }});
     //    }
     // } catch (e) {
     //    yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: e.message, color: "danger", visible: true }});
     // }
  }

  static * get(action) {
     try { 
        const profile = yield call(api.profile.get);
        yield put({type: actions.profile.types.UPDATE, payload: { profile: profile} });
     } catch (e) {
        yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: {message: e.message, color: "danger", visible: true}});
     }
  }
}

export default Profile;
