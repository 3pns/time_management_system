import React, { Component, lazy, Suspense } from 'react';
import {

} from 'reactstrap';

class TimeEntries extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div >
      This is the time entries
      </div>
    )
  }
}

export default TimeEntries;
