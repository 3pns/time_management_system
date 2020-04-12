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

class PasswordSettings extends Component {

  onDispatch = (values) => {
    store.dispatch({type: actions.profile.types.PATCH_NEW_PASSWORD, payload: { data: { user: values} } });
  }


  validationSchema = () => {
    return yup.object().shape({
    password_confirmation: yup.string()
      .oneOf([yup.ref('password'), null], "Passwords don't match")
      .min(6, 'Too Short!')
      .required('Required')
      .ensure(),
    recaptcha: yup.string()
      .required('Required')
      .ensure(),
    })
  }

  fields = [
    {
      label: "Password",
      type: "password",
      name: "password"
    },
    {
      label: "Password Confirmation",
      type: "password",
      name: "password_confirmation"
    }
  ]

  render() {
    return (
      <div>
        <Row>
          <div className="col-lg-3"/>
          <div className="col-lg-6">
            <FormBuilder
              initialValues={{ password: '', password_confirmation: '' }}
              validate={this.validate}
              validationSchema={this.validationSchema}
              initialErrors={{...this.props.errors}}
              onSubmit={this.onSubmit}
              enableReinitialize={true}
              submitButtonText= "Save"
              hideReturnButton={true}
              fields={this.fields}
              errors={this.props.errors}
              onDispatch={this.onDispatch}
            />
          </div>
        </Row>
      </div>
    )
  }
}
export default PasswordSettings;
