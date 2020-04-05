import React, { Component, lazy, Suspense } from 'react';
import {

} from 'reactstrap';

class Settings extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div >
      This is the settings
      </div>
    )
  }
}

export default Settings;
