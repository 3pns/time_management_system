import { call, put } from 'redux-saga/effects'
import api from 'services/api'
import actions from 'actions'
import { toast } from 'services/utils'

class Users {

  static * get(action) {
     try { 
        const user = yield call(api.users.get, action.payload);
        if (user != null && action.payload.updateCollection){
          yield put({type: actions.users.types.UPDATE_COLLECTION_WITH_ITEM, payload: { user: user , id: user.id }});
        } else if (user != null && action.payload.updateItem){
          yield put({type: actions.users.types.UPDATE_ITEM, payload: { user: user , id: user.id }});
        }
     } catch (e) {
        toast("error", e.message)
     }
  }

  static * all(action) {
     try { 
        console.log(action)
        const users = yield call(api.users.all, action.payload);
        if (users != null){
          yield put({type: actions.users.types.UPDATE_COLLECTION, payload: { users: users }});
        }
     } catch (e) {
        toast("error", e.message)
     }
  }

  static * create(action) {
     try { 
        console.log("ERRORS INBEFORE")
        let user = yield call(api.users.create, action.payload);
        console.log(user)
        if (user.errors){
          console.log("ERRORS DTCED")
          yield put({type: actions.users.types.UPDATE_ERRORS, payload: { errors: user.errors }});
          user = null
        }
        if (user != null){
          toast("success", "User created with success")
        }
        if (user != null && action.payload.updateCollection){
          yield put({type: actions.users.types.UPDATE_COLLECTION_WITH_ITEM, payload: { user: user , id: user.id }});
        } 
        if (user != null && action.payload.updateItem){
          yield put({type: actions.users.types.UPDATE_ITEM, payload: { user: user , id: user.id }});
        }
     } catch (e) {
        toast("error", e.message)
     }
  }

  static * patch(action) {
     try { 
        let user = yield call(api.users.patch, action.payload);
        if (user.errors){
          yield put({type: actions.users.types.UPDATE_ERRORS, payload: { errors: user.errors }});
          user = null
        }
        if (user != null){
          toast("success", "User updated with success")
        }
        if (user != null && action.payload.updateCollection){
          yield put({type: actions.users.types.UPDATE_COLLECTION_WITH_ITEM, payload: { user: user , id: user.id }});
        } else if (user != null && action.payload.updateItem){
          yield put({type: actions.users.types.UPDATE_ITEM, payload: { user: user , id: user.id }});
        }
     } catch (e) {
        toast("error", e.message)
     }
  }

  static * patchUserSettings(action) {
     try { 
        let user_settings = yield call(api.users.patchUserSettings, action.payload);
        if (user_settings.errors){
          yield put({type: actions.users.types.UPDATE_ERRORS, payload: { errors: user_settings }});
          user_settings = null
        }
        if (user_settings != null){
          toast("success", "Settings updated with success")
          //todo update profile directly inside reducer
          yield put({type: actions.profile.types.GET, payload: {}});
        }
     } catch (e) {
        toast("error", e.message)
     }
  }

  static * patchNewPassword(action) {
     try { 
        let user = yield call(api.users.patchNewPassword, action.payload);
        if (user.errors){
          yield put({type: actions.users.types.UPDATE_ERRORS, payload: { errors: user }});
          user = null
        }
        if (user != null){
          toast("success", "User updated with success")
        }
     } catch (e) {
        toast("error", e.message)
     }
  }

  static * delete(action) {
     try { 
        const user = yield call(api.users.delete, { id: action.payload.id });
        if (user != null){
          if (action.payload.updateItem){
            yield put({type: actions.users.types.UPDATE_ITEM, payload: { user: null, id: action.payload.id }});
          } else if(action.payload.updateCollection) {
            yield put({type: actions.users.types.UPDATE_COLLECTION_WITH_ITEM, payload: { user: null , id: action.payload.id }});
          }
          toast("success", "Deleted user with success")
        }
     } catch (e) {
        toast("error", e.message)
     }
  }

}

export default Users
