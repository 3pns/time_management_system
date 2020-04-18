import { combineReducers, createStore, applyMiddleware } from 'redux';
//import { Provider } from 'react-redux';
import { profile, users, time_entries, invitations, app } from 'reducers';
import BootstrapReduxAlert from 'components/BootstrapReduxAlert/reducers'
import BootstrapReduxModal from 'components/BootstrapReduxModal/reducers'

// redux saga
import createSagaMiddleware from 'redux-saga'
import mySaga from 'saga'
const sagaMiddleware = createSagaMiddleware()


export const store = createStore(
  combineReducers({
    BootstrapReduxAlert,
    BootstrapReduxModal,
    profile,
    users,
    time_entries,
    invitations,
    app
  //  someOtherReducer 
  }),
  applyMiddleware(sagaMiddleware)

);

sagaMiddleware.run(mySaga)

export default store;
