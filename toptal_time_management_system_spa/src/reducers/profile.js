import actions from 'actions'

export const profile = (profile = {authenticated: false}, action) => {
  switch (action.type) {
    case actions.profile.types.UPDATE:
      if(action.payload.profile != null && action.payload.profile.id != null){
        profile = action.payload.profile
        profile.authenticated = true
      } else {
        profile = {authenticated: true}
      }
      return profile
    default:
      return profile
  }
}

export default profile
