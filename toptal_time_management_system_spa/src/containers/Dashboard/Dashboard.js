import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';

import {

} from 'reactstrap';

class Dashboard extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    console.log("in dashboard")
    console.log(this.props)
    return (
      <div >
      { "Welcome back " + this.props.profile.first_name + " " + this.props.profile.last_name}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {profile: state.profile}
}

export default connect(mapStateToProps)(Dashboard);

