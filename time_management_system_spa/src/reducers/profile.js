import actions from 'actions'

export const profile = (state = {authenticated: false, errors: {}, isNewAccount: false}, action) => {
  switch (action.type) {
    case actions.profile.types.UPDATE:
      if(action.payload.profile != null && action.payload.profile.id != null){
        let isNewAccount = state.isNewAccount
        state = action.payload.profile
        state.errors = {}
        state.authenticated = true
        state.isNewAccount = isNewAccount
        localStorage.setItem('currentUserId', state.id)
      } else {
        state = {authenticated: false, errors: {}, isNewAccount: false}
      }
      return state
    case actions.profile.types.UPDATE_ERRORS:
      const { errors } = action.payload
      state.errors = errors
      return { ...state }
    default:
      return state
  }
}

export default profile
