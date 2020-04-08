import { call, put } from 'redux-saga/effects'
import api from 'services/api'
import actions from 'actions'
import { SHOW_BOOTSTRAP_REDUX_ALERT } from 'components/BootstrapReduxAlert/actions'

class TimeEntries {

  static * get(action) {
     try { 
        const time_entry = yield call(api.time_entries.get, action.payload);
        if (time_entry != null){
          yield put({type: actions.time_entries.types.UPDATE, payload: { time_entry: time_entry , id: time_entry.id }});
        }
     } catch (e) {
        yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: e.message, color: "danger", visible: true }});
     }
  }

  static * all(action) {
     try { 
        const time_entries = yield call(api.time_entries.all, action.payload);
        console.log("+++")
        console.log(time_entries)
        if (time_entries != null){
          yield put({type: actions.time_entries.types.UPDATE_ALL, payload: { time_entries: time_entries }});
        }
     } catch (e) {
        yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: e.message, color: "danger", visible: true }});
     }
  }

  static * create(action) {
     try { 
        const time_entry = yield call(api.time_entries.create, action.payload);
        if (time_entry != null){
          yield put({type: actions.time_entries.types.UPDATE, payload: { time_entry: time_entry, id: time_entry.id }});
          yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: "Created time_entry with success", color: "success", visible: true }});
        }
     } catch (e) {
        yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: e.message, color: "danger", visible: true }});
     }
  }

  static * patch(action) {
     try { 
        const time_entry = yield call(api.time_entries.patch, action.payload);
        if (time_entry != null){
          yield put({type: actions.time_entries.types.UPDATE, payload: { time_entry: time_entry, id: time_entry.id }});
          if (time_entry.id !== action.payload.id){
            // remove previous time_entry if id changed
            yield put({type: actions.time_entries.types.UPDATE, payload: { time_entry: null, id: action.payload.id }});
          }
          yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: "Updated time_entry with success", color: "success", visible: true }});
          if (action.payload.redirect !== false){
            //history.push('/time_entry/' + time_entry.id)
          }
        }
     } catch (e) {
        yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: e.message, color: "danger", visible: true }});
     }
  }

  static * delete(action) {
     try { 
        const time_entry = yield call(api.time_entries.delete, { appSku: action.payload.appSku, id: action.payload.id });
        if (time_entry != null){
          yield put({type: actions.time_entries.types.UPDATE, payload: { time_entry: null, id: action.payload.id }});
          //yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: "Deleted time_entry with success", color: "success", visible: true }});
        }
     } catch (e) {
        yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: e.message, color: "danger", visible: true }});
     }
  }

}

export default TimeEntries
