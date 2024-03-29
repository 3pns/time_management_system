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
  Link
} from "react-router-dom";
import 'react-dates/initialize';
import { IndexBuilder } from 'views'
import { has_role } from 'services/utils'

class Users extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  componentWillMount() {
    store.dispatch({type: actions.users.types.ALL});
  }

  columns = [
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
    }
  ];

  onRefresh = (body) => {
    store.dispatch({type: actions.users.types.ALL, payload: body});
  }

  render() {
    let isAdmin = has_role("admin")
    let hideEditButton = true
    let hideDeleteButton = true
    if (isAdmin){
      hideEditButton = false
      hideDeleteButton = false
    }
    return (
      <Card>
        <CardHeader>
          <div className="row">
            <div className="col-md-8">
              <h2>Users</h2>
            </div>
            {
              isAdmin
              ?
              <div className="col-md-4 float-right">
                <Link className="btn btn-success float-right" to={"/users/new"}>New</Link>
              </div>
              :
              <React.Fragment></React.Fragment>
            }

          </div>
        </CardHeader>
        <CardBody>
          <IndexBuilder
            columns={this.columns}
            data={this.props.users.users}
            pagination={this.props.users.pagination}
            deleteAction={actions.users.types.DELETE}
            onRefresh={this.onRefresh}
            resourceBasePath={'/users'}
            hideEditButton={hideEditButton}
            hideDeleteButton={hideDeleteButton}
          />
        </CardBody>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {profile: state.profile, users: state.users}
}
export default withRouter(connect(mapStateToProps)(Users));
