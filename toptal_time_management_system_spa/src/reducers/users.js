import actions from 'actions';

export const users = (users = [], action) => {
  switch (action.type) {
    case actions.users.types.UPDATE:
      var {id, collection} = action.payload
      return users;
    case actions.users.types.UPDATE_ALL:
      return users;
    default:
      return users;
  }
};

export default users
