import { call, put } from 'redux-saga/effects'
import Api from 'services/api'
import actions from 'actions'
import { SHOW_BOOTSTRAP_REDUX_ALERT } from 'components/BootstrapReduxAlert/actions'

class TimeEntries {

  static * fetch(action) {
     try { 
        const time_entry = yield call(Api.TimeEntry.get, action.payload);
        if (time_entry != null){
          yield put({type: actions.time_entries.types.UPDATE, payload: { time_entry: time_entry , id: time_entry.id }});
        }
     } catch (e) {
        yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: e.message, color: "danger", visible: true }});
     }
  }

  static * all(action) {
     try { 
        const time_entry = yield call(Api.TimeEntry.all, action.payload);
        if (time_entry != null){
          yield put({type: actions.time_entries.types.UPDATE_ALL, payload: { time_entry: time_entry }});
        }
     } catch (e) {
        yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: e.message, color: "danger", visible: true }});
     }
  }

  static * create(action) {
     try { 
        const time_entry = yield call(Api.TimeEntry.create, action.payload);
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
        const time_entry = yield call(Api.TimeEntry.patch, action.payload);
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
        const time_entry = yield call(Api.TimeEntry.delete, { appSku: action.payload.appSku, id: action.payload.id });
        if (time_entry != null){
          yield put({type: actions.time_entries.types.UPDATE, payload: { time_entry: null, id: action.payload.id }});
          yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: "Deleted time_entry with success", color: "success", visible: true }});
        }
     } catch (e) {
        yield put({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: e.message, color: "danger", visible: true }});
     }
  }

}

export default TimeEntries
