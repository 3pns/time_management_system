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
import Edit from './Edit'
import Index from './Index'
import Show from './Show'

const ActionsCells = (obj) => {
  return (
    <div>
      <Link className="btn btn-success" to={"/users/" +obj.id}>Show</Link>
      <Link className="btn btn-warning" to={"/users/" +obj.id+ "/edit"}>Edit</Link>
    </div>
  )
}
const columns = [
  {
    name: 'Id',
    selector: 'id',
    sortable: true
  },
  {
    name: 'email',
    selector: 'email',
    sortable: true,
  },
  {
    name: 'First Name',
    selector: 'first_name',
    sortable: true
  },
  {
    name: 'Last Name',
    selector: 'last_name',
    sortable: true
  },
  {
    name: 'Actions',
    selector: 'last_name',
    sortable: false,
    cell: ActionsCells
  },
];

class Users extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  componentWillMount() {
    store.dispatch({type: actions.users.types.ALL, payload: {}});
  }

  render() {
    return (
      <Switch>
        <Route exact key="users/new"  name="New" path="/users/new" render={(routeProps) => (<New {...routeProps}  />)}/>
        <Route exact key="users/edit"  name="Edit" path="/users/:id/edit" render={(routeProps) => ( <Edit {...routeProps} />)}/>
        <Route exact key="users/show"  name="Show" path="/users/:id" render={(routeProps) => (<Show {...routeProps}  />)}/>
        <Route key="users/index"  name="Index" path="/users" render={(routeProps) => ( <Index {...routeProps} /> )}/>
      </Switch>
    )
  }
}

const mapStateToProps = state => {
  return {profile: state.profile, users: state.users.users, user: state.users.user, pagination: state.users.pagination}
}
export default withRouter(connect(mapStateToProps)(Users));
