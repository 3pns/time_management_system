import profile from './profile'
import users from './users'
import time_entries from './time_entries'
import invitations from './invitations'

let reducers = {
}
reducers.profile = profile;
reducers.users = users;
reducers.time_entries = time_entries;
reducers.invitations = invitations;

export {
  profile,
  users,
  time_entries,
  invitations
};
