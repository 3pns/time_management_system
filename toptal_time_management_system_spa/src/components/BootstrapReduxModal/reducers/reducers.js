import { SHOW_BOOTSTRAP_REDUX_MODAL, DISMISS_BOOTSTRAP_REDUX_MODAL } from '../actions';

export const bootstrapReduxModal = (bootstrapReduxModal = {hidden: true, color: "danger", description: "", currentActionType: "", currentActionparams: {} }, action) => {
  switch (action.type) {
    case SHOW_BOOTSTRAP_REDUX_MODAL:
      console.log(action)
      return action.payload
    case DISMISS_BOOTSTRAP_REDUX_MODAL:
      bootstrapReduxModal.hidden = true
      return bootstrapReduxModal
    default:
      return null;
  }
};

export default bootstrapReduxModal
