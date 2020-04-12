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

class New extends Component {

  onDispatch(values){
    store.dispatch({type: actions.users.types.CREATE, payload: { data: { user: values} } });
  }

  validationSchema = () => {
    return yup.object().shape({
      email: yup.string()
        .required('Required'),
      first_name: yup.string()
        .required('Required'),
      last_name: yup.string()
        .required('Required'),
      password: yup.string()
        .min(6, 'Too Short!')
        .required('Required')
        .ensure(),
      password_confirmation: yup.string()
        .oneOf([yup.ref('password'), null], "Passwords don't match")
        .min(6, 'Too Short!')
        .required('Required')
        .ensure(),
    })
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
  {
    label: "Password",
    type: "password",
    name: "password"
  },
  {
    label: "Password Confirmation",
    type: "password_confirmation",
    name: "password_confirmation"
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
                  submitButtonText= "Create"
                  returnButtonText= "Return"
                  returnButtonTo= "/users"
                  fields={this.fields}
                  errors={this.props.errors}
                  onDispatch={this.onDispatch}
                />
              </div>
            </Row>
          </div>
        </CardBody>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  let user = {
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirmation: ''
  }
  return { profile: state.profile, user: user, errors: state.users.errors }
}
export default withRouter(connect(mapStateToProps)(New));
