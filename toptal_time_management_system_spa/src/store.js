import { combineReducers, createStore, applyMiddleware } from 'redux';
//import { Provider } from 'react-redux';
import { profile, users, time_entries } from 'reducers';
import BootstrapReduxAlert from 'components/BootstrapReduxAlert/reducers'
// redux saga
import createSagaMiddleware from 'redux-saga'
import mySaga from 'saga'

//alerts

const sagaMiddleware = createSagaMiddleware()


export const store = createStore(
  combineReducers({
    BootstrapReduxAlert,
    profile,
    users,
    time_entries
  //  someOtherReducer 
  }),
  applyMiddleware(sagaMiddleware)

);

sagaMiddleware.run(mySaga)

export default store;

// copies from app/store
// import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';

// export default configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });
