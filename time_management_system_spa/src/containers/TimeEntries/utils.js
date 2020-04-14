import ReactDOM from 'react-dom'
import React from 'react';
import TimeEntriesReport from './TimeEntriesReport'

const exportReportToHtml = function (time_entries, user, startDate, endDate){
  console.log("exporting data to html");
  var element = document.createElement('a');
  let time_entries_clone = document.querySelector('#times-entries-parent-holder').cloneNode( true );
  let head_clone = document.querySelector('head').cloneNode( true );
  let html_holder = document.createElement('html');
  html_holder.appendChild(head_clone);
  let body_holder = document.createElement('body');

  ReactDOM.render(<TimeEntriesReport time_entries={time_entries} user={user} startDate={startDate} endDate={endDate} /> , body_holder)

  html_holder.appendChild(body_holder);
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(html_holder.innerHTML));
  element.setAttribute('download', "export.html");
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

const secondsToString = (seconds) => {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds - hours * 3600) / 60);
  hours = hours + ""
  if(hours.length == 1){
    hours = "0" + hours 
  }
  minutes = minutes + ""
  if(minutes.length == 1){
    minutes = "0" + minutes 
  }
  return hours + ":" + minutes
}

const stringToSeconds = (string) => {
  if (string == null){
    return 0
  }
  let array = string.split(":")
  let seconds =  parseInt(array[0]) ? parseInt(array[0]) * 3600 : 0;
  seconds += parseInt(array[1]) ? parseInt(array[1]) * 60 : 0;
  return seconds
}

export { exportReportToHtml, secondsToString, stringToSeconds };
