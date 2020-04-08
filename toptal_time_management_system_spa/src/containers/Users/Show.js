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
import { Profile } from 'views'

class Show extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  componentWillMount() {
    store.dispatch({type: actions.users.types.GET, payload: {updateItem: true, id: this.props.match.params.id}});
  }

  render() {
    console.log("REREDINRING")
    console.log(this.props)
    return (
      <Card>
        <CardHeader>
          <div className="row">
            <div className="col-md-8">
              <h2>Users</h2>
            </div>
            <div className="col-md-4 float-right">
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <Profile user={this.props.user}/>
        </CardBody>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {profile: state.profile, user: state.users.user}
}
export default withRouter(connect(mapStateToProps)(Show));
