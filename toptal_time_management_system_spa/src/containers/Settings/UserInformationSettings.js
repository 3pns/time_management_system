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

class UserInformationSettings extends Component {

  onDispatch = (values) => {
    console.log(this.props)
    store.dispatch({type: actions.profile.types.PATCH, payload: { data: { profile: values}, id: this.props.profile.id } });
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
      inputType: "text",
      name: "first_name"
    },
    {
      label: "Last Name",
      inputType: "text",
      name: "last_name"
    },
    {
      label: "Email",
      inputType: "email",
      name: "email",
      placeholder: "user@example.com"
    },
  ]

  render() {
    return (
      <div>
        <Row style={{display: "flex"}}>
          <Avatar name={ this.props.profile.first_name + " " + this.props.profile.last_name } 
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
              initialValues={{ ...this.props.profile }}
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
export default UserInformationSettings;
