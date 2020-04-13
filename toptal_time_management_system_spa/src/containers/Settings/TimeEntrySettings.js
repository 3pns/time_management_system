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

class TimeEntrySettings extends Component {

  onDispatch = (values) => {
    store.dispatch({type: actions.users.types.PATCH_USER_SETTINGS, payload: { data: { user_setting: values}, id: this.props.profile.id } });
  }

  validationSchema = () => {
    return yup.object().shape({
      preferred_working_hours_per_day_enabled: yup.boolean()
        .required('Required'),
      preferred_working_hours_per_day: yup.number()
        .integer()
        .min(0)
        .max(24)
        .required('Required'),
    })
  }

  fields = [
    {
      label: "Enable preferred working hours per day system",
      inputType: "checkbox",
      name: "preferred_working_hours_per_day_enabled"
    },
    {
      label: "Preferred working hours per day",
      inputType: "number",
      name: "preferred_working_hours_per_day"
    }
  ]

  render() {
    let user_settings = this.props.profile.settings
    return (
      <Row>
        <div className="col-lg-3"/>
        <div className="col-lg-6">
          <FormBuilder
            initialValues={{ ...user_settings }}
            validate={this.validate}
            validationSchema={this.validationSchema}
            initialErrors={{...this.props.errors}}
            onSubmit={this.onSubmit}
            enableReinitialize={true}
            submitButtonText="Save"
            hideReturnButton={true}
            fields={this.fields}
            errors={this.props.errors}
            onDispatch={this.onDispatch}
          />
        </div>
      </Row>
    )
  }
}

export default TimeEntrySettings;
