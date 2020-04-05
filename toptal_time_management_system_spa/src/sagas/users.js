import { call, put } from 'redux-saga/effects'
import Api from 'services/api'
import actions from 'actions/users'
import { SHOW_BOOTSTRAP_REDUX_ALERT } from 'components/BootstrapReduxAlert/actions'
// import history from 'services/utils/history'

class Users {

  static * fetch(action) {
     try { 
        const user = yield call(Api.Users.get, action.payload);
        if (user != null){
          yield put({type: actions.users.types.UPDATE, payload: { user: user , id: user.id }});
        }
     } catch (e) {
        yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: e.message, color: "danger", visible: true }});
     }
  }

  static * all(action) {
     try { 
        const users = yield call(Api.Users.all, action.payload);
        if (users != null){
          yield put({type: actions.users.types.UPDATES, payload: { users: users }});
        }
     } catch (e) {
        yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: e.message, color: "danger", visible: true }});
     }
  }

  static * create(action) {
     try { 
        const user = yield call(Api.Users.create, action.payload);
        if (user != null){
          yield put({type: actions.users.types.UPDATE, payload: { user: user, id: user.id }});
          yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: "Created user with success", color: "success", visible: true }});
        }
     } catch (e) {
        yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: e.message, color: "danger", visible: true }});
     }
  }

  static * patch(action) {
     try { 
        const user = yield call(Api.Users.patch, action.payload);
        if (user != null){
          yield put({type: actions.users.types.UPDATE, payload: { user: user, id: user.id }});
          if (user.id !== action.payload.id){
            //remove previous user if id changed
            yield put({type: actions.users.types.UPDATE, payload: { user: null, id: action.payload.id }});
          }
        yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: "Updated user with success", color: "success", visible: true }});
          // if (action.payload.redirect !== false){
          //   history.push('/users/' + user.id)
          // }
        }
     } catch (e) {
        yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: e.message, color: "danger", visible: true }});
     }
  }

  static * delete(action) {
     try { 
        const user = yield call(Api.Users.delete, { appSku: action.payload.appSku, id: action.payload.id });
        if (user != null){
          yield put({type: actions.users.types.UPDATE, payload: { user: null, id: action.payload.id }});
          yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: "Deleted user with success", color: "success", visible: true }});
        }
     } catch (e) {
        yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: e.message, color: "danger", visible: true }});
     }
  }

}

export default Users
