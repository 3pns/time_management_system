import { call, put } from 'redux-saga/effects'
import api from 'services/api'
import actions from 'actions'
import { toast, errorsToString } from 'services/utils'

class TimeEntries {

  static * get(action) {
     try { 
        const time_entry = yield call(api.time_entries.get, action.payload);
        if (time_entry != null){
          yield put({type: actions.time_entries.types.UPDATE, payload: { time_entry: time_entry , id: time_entry.id }});
        }
     } catch (e) {
        toast("error", e.message)
     }
  }

  static * all(action) {
     try { 
        const time_entries = yield call(api.time_entries.all, action.payload);
        if (time_entries != null){
          yield put({type: actions.time_entries.types.UPDATE_ALL, payload: { time_entries: time_entries }});
        }
     } catch (e) {
        toast("error", e.message)
     }
  }

  static * create(action) {
     try { 
        const time_entry = yield call(api.time_entries.create, action.payload);
        if (time_entry != null && time_entry.errors){
          toast("error", errorsToString(time_entry.errors))
        } else if (time_entry != null){
          yield put({type: actions.time_entries.types.UPDATE, payload: { time_entry: time_entry, id: time_entry.id }});
          toast("success", "Created time entry with success")
        }
     } catch (e) {
        toast("error", e.message)
     }
  }

  static * patch(action) {
     try { 
        const time_entry = yield call(api.time_entries.patch, action.payload);
        if (time_entry != null && time_entry.errors){
          toast("error", errorsToString(time_entry.errors))
        } else if (time_entry != null){
          yield put({type: actions.time_entries.types.UPDATE, payload: { time_entry: time_entry, id: time_entry.id }});
          toast("success", "Updated time entry with success")
        }
     } catch (e) {
        toast("error", e.message)
     }
  }

  static * delete(action) {
     try { 
        const time_entry = yield call(api.time_entries.delete, { appSku: action.payload.appSku, id: action.payload.id });
        if (time_entry != null){
          yield put({type: actions.time_entries.types.UPDATE, payload: { time_entry: null, id: action.payload.id }});
          toast("success", "Deleted time_entry with success")
        }
     } catch (e) {
        toast("error", e.message)
     }
  }

}

export default TimeEntries
