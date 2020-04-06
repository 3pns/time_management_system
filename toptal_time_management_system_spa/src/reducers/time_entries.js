import actions from 'actions';

export const time_entries = (time_entries = [], action) => {
  switch (action.type) {
    case actions.time_entries.types.UPDATE_TIME_ENTRY:
      var {id, time_entry} = action.payload
      return time_entries;
    case actions.time_entries.UPDATE_TIME_ENTRIES:
      return time_entries;
    default:
      return time_entries;
  }
};

export default time_entries
