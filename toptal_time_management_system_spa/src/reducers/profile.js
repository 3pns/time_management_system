import actions from 'actions'

export const profile = (state = {authenticated: false, errors: {}}, action) => {
  switch (action.type) {
    case actions.profile.types.UPDATE:
      if(action.payload.profile != null && action.payload.profile.id != null){
        state = action.payload.profile
        state.errors = {}
        state.authenticated = true
        localStorage.setItem('currentUserId', state.id)
      } else {
        state = {authenticated: false, errors: {}}
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
