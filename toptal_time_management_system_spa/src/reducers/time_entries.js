import actions from 'actions';
import { updateCollection } from './utils'

function generateAggregatedTimeEntries(time_entries){
  let aggregated_time_entries = {}
  time_entries.forEach((time_entry) => {
    if( aggregated_time_entries[time_entry.date] == null){
      aggregated_time_entries[time_entry.date] = {
        date: time_entry.date,
        totalTime: time_entry.duration,
        notes: [time_entry.note],
        time_entries: [time_entry]
      }
    } else {
      aggregated_time_entries[time_entry.date].totalTime += time_entry.duration
      aggregated_time_entries[time_entry.date].notes.push(time_entry.note)
      aggregated_time_entries[time_entry.date].time_entries.push(time_entry)
    }
    // sort by date desc
    let tmp = {}
    Object.keys(aggregated_time_entries).sort().reverse().forEach(function(key) {
      tmp[key] = aggregated_time_entries[key];
    });
    aggregated_time_entries = tmp
  })
  return aggregated_time_entries;
}

export const time_entries = (time_entries = [], action) => {
  switch (action.type) {
    case actions.time_entries.types.UPDATE:
      var {id, time_entry} = action.payload
      var {time_entries, aggregated_time_entries} = time_entries
      console.log(time_entries)
      time_entries = updateCollection(id, time_entry, time_entries)
      aggregated_time_entries = generateAggregatedTimeEntries(time_entries)
      return {time_entries, aggregated_time_entries};
    case actions.time_entries.types.UPDATE_ALL:
      time_entries = action.payload.time_entries.data
      aggregated_time_entries = generateAggregatedTimeEntries(time_entries)
      return {time_entries, aggregated_time_entries};
    default:
      return time_entries;
  }
};

export default time_entries
