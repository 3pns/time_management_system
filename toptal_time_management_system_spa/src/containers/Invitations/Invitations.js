import React, { Component, lazy, Suspense } from 'react';
import {
  ListGroupItem,
  Button,
  Card,
  CardHeader,
  CardBody
} from 'reactstrap';
import DataTable from 'react-data-table-component';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import actions from 'actions'
import store from 'store'
import {
  Link,
  Route,
  Switch 
} from "react-router-dom";
import New from './New'
import Index from './Index'

class Invitations extends Component {

  componentWillMount() {
    store.dispatch({type: actions.invitations.types.ALL, payload: {}});
  }

  render() {
    return (
      <Switch>
        <Route exact key="invitations/new"  name="New" path="/invitations/new" render={(routeProps) => (<New {...routeProps}  />)}/>
        <Route key="invitations/index"  name="Index" path="/invitations" render={(routeProps) => ( <Index {...routeProps} /> )}/>
      </Switch>
    )
  }
}

const mapStateToProps = state => {

  return {profile: state.profile, invitations: state.invitations.invitations, invitation: state.invitations.invitation, pagination: state.invitations.pagination}
}
export default withRouter(connect(mapStateToProps)(Invitations));
