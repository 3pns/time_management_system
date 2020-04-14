import actions from 'actions';
import { updateCollection } from './utils'

export const invitations = (state = {invitations: [], invitation: {}, pagination: [], errors: {}}, action) => {
  switch (action.type) {
    case actions.invitations.types.UPDATE_ITEM:
      var {id, collection} = action.payload
      state.invitation = action.payload.invitation
      return { ...state }
    case actions.invitations.types.UPDATE_COLLECTION_WITH_ITEM:
      var {id, invitation} = action.payload
      var invitations = updateCollection(id, invitation, state.invitations)
      state.invitations = [...invitations]
      return { ...state }
    case actions.invitations.types.UPDATE_COLLECTION:
      state.invitations = action.payload.invitations.data
      state.pagination = action.payload.invitations.pagination
      return { ...state }
    case actions.invitations.types.UPDATE_ERRORS:
      const { errors } = action.payload
      state.errors = errors
      return { ...state }
    default:
      return state
  }
};

export default invitations
