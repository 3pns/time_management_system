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
import { has_role } from 'services/utils'

class New extends Component {

  onDispatch(values){
    store.dispatch({type: actions.invitations.types.CREATE, payload: { data: { invitation: values} } });
  }

  // :email, :roles, :invite_as_subordinate
  validationSchema = () => {
    return yup.object().shape({
      email: yup.string()
        .required('Required'),
      invite_as_subordinate: yup.boolean()
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
      label: "Email",
      inputType: "text",
      name: "email"
    },
    {
      label: "Invite as Subordinate",
      inputType: "checkbox",
      name: "invite_as_subordinate"
    }
  ]

  render() {
    if(has_role("admin"))
    this.fields.push({
      label: "Roles",
      name: "roles",
      inputType: "select",
      multiple: true,
      delayInitialValues: true,
      choices: this.props.roles
    })
    console.log(this.props)
    return (
      <Card>
        <CardHeader>
          <div className="row">
            <div className="col-md-8">
              <h2>Invitations</h2>
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
                  initialValues={{ ...this.props.invitation }}
                  validate={this.validate}
                  validationSchema={this.validationSchema}
                  initialErrors={{...this.props.errors}}
                  onSubmit={this.onSubmit}
                  enableReinitialize={true}
                  submitButtonText= "Create"
                  returnButtonText= "Return"
                  returnButtonTo= "/invitations"
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
  let roles = [
    { value: "user", label: "User" },
    { value: "manager", label: "Manager" },
    { value: "admin", label: "Admin" }
  ]
  let invitation = {
    email: '',
    invite_as_subordinate: '',
    roles: []
  }
  return { profile: state.profile, invitation: invitation, errors: state.invitations.errors, roles: roles }
}
export default withRouter(connect(mapStateToProps)(New));
