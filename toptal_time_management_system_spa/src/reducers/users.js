import actions from 'actions';

export const users = (users = [], action) => {
  switch (action.type) {
    case actions.users.UPDATE_COLLECTION:
      var {id, collection} = action.payload
      return users;
    case actions.users.UPDATE_USERS:
      return users;
    default:
      return users;
  }
};

export default users
