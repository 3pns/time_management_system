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
    password: yup.string()
      .min(6, 'Too Short!')
      .required('Required')
      .ensure(),
    password_confirmation: yup.string()
      .oneOf([yup.ref('password'), null], "Passwords don't match")
      .min(6, 'Too Short!')
      .required('Required')
      .ensure()
    })
  }

  fields = [
    {
      label: "Current Password",
      inputType: "password",
      name: "current_password"
    },
    {
      label: "Password",
      inputType: "password",
      name: "password"
    },
    {
      label: "Password Confirmation",
      inputType: "password",
      name: "password_confirmation"
    }
  ]

  render() {
    console.log(this.props)
    return (
      <div>
        <Row>
          <div className="col-lg-3"/>
          <div className="col-lg-6">
            <FormBuilder
              initialValues={{ current_password: '', password: '', password_confirmation: '' }}
              validate={this.validate}
              validationSchema={this.validationSchema}
              initialErrors={{...this.props.errors}}
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
