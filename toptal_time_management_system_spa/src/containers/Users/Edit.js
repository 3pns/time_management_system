import React, { Component, lazy, Suspense } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Row
} from 'reactstrap';
import * as yup from 'yup';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import actions from 'actions'
import store from 'store'
import { FormBuilder } from 'views'
import Avatar from 'react-avatar';
import { LineDivider } from 'views'
import TimeEntrySettings from '../Settings/TimeEntrySettings'
import PasswordSettings from '../Settings/PasswordSettings'

class Edit extends Component {
  componentWillMount() {
    store.dispatch({type: actions.users.types.GET, payload: {updateItem: true, id: this.props.match.params.id}});
  }

  onDispatch = (values) => {
    store.dispatch({type: actions.users.types.PATCH, payload: { data: { user: values}, id: this.props.user.id } });
  }

  validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    return errors;
  }

  validationSchema = () => {
    return yup.object().shape({
    email: yup.string()
      .required('Required'),
    first_name: yup.string()
      .required('Required'),
    last_name: yup.string()
      .required('Required')
  })}

  fields = [
    {
      label: "First Name",
      type: "text",
      name: "first_name"
    },
    {
      label: "Last Name",
      type: "text",
      name: "last_name"
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "user@example.com"
    },
  ]

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
          <div>
            <Row style={{display: "flex"}}>
              <Avatar name={ this.props.first_name + " " + this.props.last_name } 
                      className="img-avatar text-center img-fluid" 
                      size="200"
                      style={{margin: "auto"}}
              />
            </Row>
            <LineDivider/>
            <Row>
              <div className="col-lg-3"/>
              <div className="col-lg-6">
                <FormBuilder
                  initialValues={{ ...this.props.user }}
                  validate={this.validate}
                  validationSchema={this.validationSchema}
                  initialErrors={{...this.props.errors}}
                  onSubmit={this.onSubmit}
                  enableReinitialize={true}
                  submitButtonText= "Save"
                  returnButtonText= "Return"
                  returnButtonTo= "/users"
                  fields={this.fields}
                  errors={this.props.errors}
                  onDispatch={this.onDispatch}
                />
              </div>
            </Row>
            <LineDivider/>
            <Row>
              <div className="col-lg-3"/>
                {/*<PasswordSettings profile={this.props.user} errors={this.props.userErrors}/>*/}
              <div className="col-lg-6"></div>
            </Row>          
          </div>
            <LineDivider/>
            <Row>
              <div className="col-lg-3"/>
                {/*<TimeEntrySettings profile={this.props.user} errors={this.props.profileErrors}/>*/}
              <div className="col-lg-6"></div>
            </Row>

        </CardBody>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  let user = state.users.user
  if(user.id == null){
    user = {
      first_name: '',
      last_name: '',
      email: '',
      settings: {
        preferred_working_hours_per_day: 0,
        preferred_working_hours_per_day_enable: false
      }
    }
  }
  return {profile: state.profile, user: user, errors: state.users.errors}
}
export default withRouter(connect(mapStateToProps)(Edit));
