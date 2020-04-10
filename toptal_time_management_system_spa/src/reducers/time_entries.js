import actions from 'actions';
import { updateCollection } from './utils'

function generateAggregatedTimeEntries(time_entries){
  let aggregated_time_entries = {}
  // build the aggregated_time_entries
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
    // sort keys by date desc
    let tmp = {}
    Object.keys(aggregated_time_entries).sort().reverse().forEach(function(key) {
      tmp[key] = aggregated_time_entries[key];
    });
    aggregated_time_entries = tmp
  })

  // sort the aggregated aggregated_time_entries by created_at
  Object.values(aggregated_time_entries).forEach((aggregated_time_entry) => {
    let sorted_time_entries = aggregated_time_entry.time_entries.sort((a, b) => (a.created_at > b.created_at) ? 1 : -1)
    aggregated_time_entries[aggregated_time_entry.date].time_entries = sorted_time_entries
  })

  // add currentDateTotalTime to each time_entries for validation purposes
  // Object.values(aggregated_time_entries).forEach((aggregated_time_entry) => {
  //   var totalTime = aggregated_time_entries[aggregated_time_entry.date].totalTime
  //   aggregated_time_entry.time_entries.forEach((time_entry, index) => {
  //     aggregated_time_entries[aggregated_time_entry.date].time_entries[index].currentDateTotalTime
  //   })
  //   let sorted_time_entries = aggregated_time_entry.time_entries.sort((a, b) => (a.created_at > b.created_at) ? 1 : -1)
  //   aggregated_time_entries[aggregated_time_entry.date].time_entries = sorted_time_entries
  // })

  return aggregated_time_entries;
}

export const time_entries = (state = {time_entries: [], aggregated_time_entries: []}, action) => {
  switch (action.type) {
    case actions.time_entries.types.UPDATE:
    console.log("UPDATING")
      var {id, time_entry} = action.payload
      var {time_entries, aggregated_time_entries} = state
      console.log(time_entries)
      console.log(aggregated_time_entries)
      time_entries = updateCollection(id, time_entry, time_entries)
      aggregated_time_entries = generateAggregatedTimeEntries(time_entries)
      return {time_entries, aggregated_time_entries};
    case actions.time_entries.types.UPDATE_ALL:
      time_entries = action.payload.time_entries.data
      aggregated_time_entries = generateAggregatedTimeEntries(time_entries)
      return {time_entries, aggregated_time_entries};
    default:
      return state;
  }
};

export default time_entries
