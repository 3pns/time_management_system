import { call, put } from 'redux-saga/effects'
import api from 'services/api'
import actions from 'actions'
import { toast } from 'services/utils'

class Profile {

  static * login(action) {
     try {
        const profile = yield call(api.profile.login, action.payload );
        if (profile != null){
          profile.authenticated = true
          yield put({type: actions.profile.types.UPDATE, payload: { profile: profile} });
          toast("success", "Sign in with success")
        } else {
          // yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: "Error while sign in", color: "danger", visible: true }});
          toast("danger", "Error while sign in")
        }
     } catch (e) {
      toast("danger", e.message)
     }
  }

  static * logout(action) {
    yield put({type: actions.profile.types.UPDATE, payload: { profile: {authenticated: false}} });
  }

  static * get(action) {
     try { 
        const profile = yield call(api.profile.get);
        if(profile && profile.id != null){
          profile.authenticated = true
          yield put({type: actions.profile.types.UPDATE, payload: { profile: profile} });
        } else {
          yield put({type: actions.profile.types.UPDATE, payload: { profile: {authenticated: false}} });
        }
     } catch (e) {
        toast("danger", e.message)
     }
  }

  static * patch(action) {
     try { 
        let profile = yield call(api.profile.patch, action.payload);
        if (profile.errors){
          yield put({type: actions.profile.types.UPDATE_ERRORS, payload: { errors: profile.errors }});
          profile = null
        }
        if (profile != null){
          toast("success", "Profile updated with success")
          yield put({type: actions.profile.types.UPDATE, payload: { profile: profile} });
        }
     } catch (e) {
        toast("error", e.message)
     }
  }

  static * patchNewPassword(action) {
     try { 
        let profile = yield call(api.profile.patchNewPassword, action.payload);
        console.log(profile)
        if (profile.errors){
          console.log(actions.profile.types.UPDATE_ERRORS)
          yield put({type: actions.profile.types.UPDATE_ERRORS, payload: { errors: profile.errors }});
          profile = null
        } else if (profile != null){
          toast("success", "Password updated with success")
        }
     } catch (e) {
        toast("error", e.message)
     }
  }
}

export default Profile;
