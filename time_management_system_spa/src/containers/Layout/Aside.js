import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Progress, TabContent, TabPane, ListGroup, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AppSwitch } from '@coreui/react'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import actions from 'actions'
import store from 'store'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class Aside extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      pwhpd_enabled: false,


    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  onChange = (event) => {
    console.log(this.state.pwhpd_enabled)
    let newVal = !this.state.pwhpd_enabled
    this.setState({
      pwhpd_enabled: newVal
    })
    store.dispatch({type: actions.users.types.PATCH_USER_SETTINGS, payload: { data: { user_setting: {preferred_working_hours_per_day_enabled: newVal}}, id: this.props.profile.id } });
  }

  onDispatch = (values) => {
    store.dispatch({type: actions.users.types.PATCH_USER_SETTINGS, payload: { data: { user_setting: values}, id: this.props.profile.id } });
  }

  static getDerivedStateFromProps(props, current_state) {
    if (props.profile.settings &&
        props.profile.settings.preferred_working_hours_per_day_enabled != current_state.pwhpd_enabled ) {
      return {
        pwhpd_enabled: props.profile.settings.preferred_working_hours_per_day_enabled
      }
    }
    return null
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    let profile = {}
    if( this.props.profile.settings ){
      profile.preferred_working_hours_per_day_enabled = this.props.profile.settings.preferred_working_hours_per_day_enabled
    }


    return (
      <React.Fragment>
        <Nav tabs>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '1' })}
                     onClick={() => {
                       this.toggle('1');
                     }}>
              <i className="icon-settings"></i>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1" className="p-3">
            <h6>Settings</h6>

            <div className="aside-options">
              <div className="clearfix mt-4">
                <small><b>Preferred Working Hours per day</b></small>
                <AppSwitch className={'float-right'} variant={'pill'} label color={'success'} checked={this.state.pwhpd_enabled} onChange={this.onChange} size={'sm'}/>
              </div>
              <div>
                <small className="text-muted">
                  Enable or disable the Time Entries report row coloring depending on the preferred working hours per day setting.
                </small>
              </div>
            </div>


          </TabPane>
        </TabContent>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { profile: state.profile }
}
export default withRouter(connect(mapStateToProps)(Aside));
