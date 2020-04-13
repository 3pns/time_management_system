import React, { Component, lazy, Suspense } from 'react';
import {
  ListGroupItem,
  Button,
  Card,
  CardHeader,
  CardBody,
  Row
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
import { has_role } from 'services/utils'

class Show extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  componentWillMount() {
    store.dispatch({type: actions.users.types.GET, payload: {updateItem: true, id: this.props.match.params.id}});
  }

  render() {
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
          <Row >
            <div className="col-lg-3"/>
            <div className="col-lg-6">
              {
                has_role("admin")
                ?
              <Row >
                <div className="col-lg-6">
                  <Link className="btn btn-warning btn-block" to={"/users/" + this.props.user.id + "/edit" } >Edit</Link>
                </div>
                <div className="col-lg-6">
                  <Link className="btn btn-info btn-block" to={"/users"} >Return</Link>
                </div>
              </Row>
              :
              <Row >
                <div className="col-lg-3">
                </div>
                <div className="col-lg-6">
                  <Link className="btn btn-info btn-block" to={"/users"} >Return</Link>
                </div>
              </Row>
              }

            </div>
          </Row>
        </CardBody>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {profile: state.profile, user: state.users.user}
}
export default withRouter(connect(mapStateToProps)(Show));
