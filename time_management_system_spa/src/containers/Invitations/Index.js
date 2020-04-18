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

class Invitations extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  componentWillMount() {
    store.dispatch({type: actions.invitations.types.ALL});
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
      name: 'Invited By',
      selector: 'invited_by_id',
      sortable: true
    },
    {
      name: 'Is a subordinate',
      selector: 'invite_as_subordinate',
      sortable: true,
      format: row => row.invite_as_subordinate ? <i className="fa fa-check-circle"></i> : <i className="fa fa-times-circle"></i>
    },
    {
      name: 'Status',
      selector: 'invitation_accepted_at',
      sortable: true,
      format: row => row.invitation_accepted_at != null ? "confirmed" : "pending"
    }
  ];

  onRefresh = (body) => {
    store.dispatch({type: actions.invitations.types.ALL, payload: body});
  }

  render() {
    let isAdmin = has_role("admin")

    return (
      <Card>
        <CardHeader>
          <div className="row">
            <div className="col-md-8">
              <h2>Invitations</h2>
            </div>
            <div className="col-md-4 float-right">
              <Link className="btn btn-success float-right" to={"/invitations/new"}>New</Link>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <IndexBuilder
            columns={this.columns}
            data={this.props.invitations.invitations}
            pagination={this.props.invitations.pagination}
            deleteAction={actions.invitations.types.DELETE}
            onRefresh={this.onRefresh}
            resourceBasePath={'/invitations'}
            hideActions={!has_role("admin")}
            hideViewButton={true}
            hideEditButton={true}
          />
        </CardBody>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {profile: state.profile, invitations: state.invitations}
}
export default withRouter(connect(mapStateToProps)(Invitations));
