import React, { Component, lazy, Suspense } from 'react';
import {

} from 'reactstrap';

class Users extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div >
      This is the users
      </div>
    )
  }
}

export default Users;
