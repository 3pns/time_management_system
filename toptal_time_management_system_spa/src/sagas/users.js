import { call, put } from 'redux-saga/effects'
import api from 'services/api'
import actions from 'actions'
import { SHOW_BOOTSTRAP_REDUX_ALERT } from 'components/BootstrapReduxAlert/actions'

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
        yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: e.message, color: "danger", visible: true }});
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
        yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: e.message, color: "danger", visible: true }});
     }
  }

  static * create(action) {
     try { 
        const user = yield call(api.users.create, action.payload);
        if (user != null){
          yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: "Created user with success", color: "success", visible: true }});
        }
        if (user != null && action.payload.updateCollection){
          yield put({type: actions.users.types.UPDATE_COLLECTION_WITH_ITEM, payload: { user: user , id: user.id }});
        } else if (user != null && action.payload.updateItem){
          yield put({type: actions.users.types.UPDATE_ITEM, payload: { user: user , id: user.id }});
        }
     } catch (e) {
        yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: e.message, color: "danger", visible: true }});
     }
  }

  static * patch(action) {
     try { 
        const user = yield call(api.users.patch, action.payload);
        if (user != null){
          yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: "Updated user with success", color: "success", visible: true }});
        }
        if (user != null && action.payload.updateCollection){
          yield put({type: actions.users.types.UPDATE_COLLECTION_WITH_ITEM, payload: { user: user , id: user.id }});
        } else if (user != null && action.payload.updateItem){
          yield put({type: actions.users.types.UPDATE_ITEM, payload: { user: user , id: user.id }});
        }
     } catch (e) {
        yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: e.message, color: "danger", visible: true }});
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
          yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: "Deleted user with success", color: "success", visible: true }});
        }
     } catch (e) {
        yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: e.message, color: "danger", visible: true }});
     }
  }

}

export default Users
