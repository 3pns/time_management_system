import React, { Component, lazy, Suspense } from 'react';
import {
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import TimeEntrySettings from './TimeEntrySettings'
import UserInformationSettings from './UserInformationSettings'
import PasswordSettings from './PasswordSettings'
const queryString = require('query-string');

class Settings extends Component {

  constructor(props) {
    super(props);
    const parsedHash = queryString.parse(this.props.location.search);
    console.log(parsedHash)
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('time_entry'),
    };

  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }

  render() {
    console.log(  )
    return (
      <div >
        <Col xs="12" md="12" className="mb-4">
          <Nav tabs>
            <NavItem>
              <NavLink
                active={this.state.activeTab[0] === 'time_entry'}
                onClick={() => { this.toggle(0, 'time_entry'); }}
              >
                Time Entry
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={this.state.activeTab[0] === 'profile'}
                onClick={() => { this.toggle(0, 'profile'); }}
              >
                User Information
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={this.state.activeTab[0] === 'password'}
                onClick={() => { this.toggle(0, 'password'); }}
              >
                Change Password
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab[0]}>
            <TabPane tabId="time_entry">
              <TimeEntrySettings profile={this.props.profile} errors={this.props.errors} />
            </TabPane>
            <TabPane tabId="profile">
              <UserInformationSettings profile={this.props.profile} errors={this.props.profileErrors} />
            </TabPane>
            <TabPane tabId="password">
              <PasswordSettings profile={this.props.profile} errors={this.props.profileErrors}/>
            </TabPane>
          </TabContent>
        </Col>      
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state.profile.id)
  let profile = {}
  if(state.profile.id){
    profile = state.profile
  } else {
    profile = {
      first_name: '',
      last_name: '',
      email: '',
      settings: {
        preferred_working_hours_per_day: 0,
        preferred_working_hours_per_day_enabled: false
      }
    }
  }

  return { profile: profile, errors: state.users.errors, profileErrors: state.profile.errors }
}
export default withRouter(connect(mapStateToProps)(Settings));
