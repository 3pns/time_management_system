import actions from 'actions';
import { updateCollection } from './utils'
import moment from 'moment'

export const users = (state = {users: [], user: {}, pagination: [], errors: {}}, action) => {
  switch (action.type) {
    case actions.users.types.UPDATE_ITEM:
      state.user = action.payload.user
      return { ...state }
    case actions.users.types.UPDATE_COLLECTION_WITH_ITEM:
      var {id, user} = action.payload
      var users = updateCollection(id, user, state.users)
      state.users = [...users]
      return { ...state }
    case actions.users.types.UPDATE_COLLECTION:
      state.users = action.payload.users.data
      state.pagination = action.payload.users.pagination
      return { ...state }
    case actions.users.types.UPDATE_ERRORS:
      const { errors } = action.payload
      state.errors = errors
      return { ...state }
    default:
      return state
  }
};

export default users
