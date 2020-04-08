import { SHOW_BOOTSTRAP_REDUX_ALERT, DISMISS_BOOTSTRAP_REDUX_ALERT } from '../actions';

export const bootstrapReduxAlert = (bootstrapReduxAlert = {message: "", color: "", visible: false}, action) => {
  switch (action.type) {
    case SHOW_BOOTSTRAP_REDUX_ALERT:
      action.payload.visible = true
      return action.payload
    case DISMISS_BOOTSTRAP_REDUX_ALERT:
      return {message: "", color: "", visible: false}
    default:
      return null;
  }
};

export default bootstrapReduxAlert
