import React, { Component, lazy, Suspense } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from 'reactstrap';
import { 
  Field,
} from 'formik';
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
import UserAutoSuggest from 'containers/utils/UserAutoSuggest'
import { optionsFromCollection, optionsFromArray, optionFromCollection } from 'services/utils'

class Edit extends Component {

  state = {
    selectedManagerId: "null"
  }

  componentWillMount() {
    let query = {
      q: {
        roles_name_in: ["manager"]
      } 
    }
    store.dispatch({type: actions.users.types.ALL, payload: query});
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

  managerRenderer = (field, errors, touched) => {
    return (
      <FormGroup key={field.name} >
        <Label htmlFor={field.name}>{field.label}</Label>
          <UserAutoSuggest 
            data={this.props.users} 
            onRefresh={this.onUserSearchRefresh} 
          />
        <FormFeedback>{errors[field.name]}</FormFeedback>
      </FormGroup>
    )

  }

  onUserSearchRefresh = (userId, newValue) => {
    this.state.selectedManagerId = userId
  }

  render() {
    let managerChoices = optionsFromCollection(this.props.users, "id", ["first_name", "last_name"])
    let inputFields = [
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
      {
        label: "Manager",
        name: "manager_id",
        placeholder: "choose a manger",
        inputType: "select",
        choices: managerChoices,
        delayInitialValues: true,
        delayOptions: true
        //renderer: this.managerRenderer
      },
      {
        label: "Roles",
        name: "roles",
        inputType: "select",
        multiple: true,
        delayInitialValues: true,
        choices: this.props.roles
      }
    ]

    let user = this.props.user
    console.log(this.props.user)
    if(user.id == null){
      user = {
        first_name: '',
        last_name: '',
        email: '',
        settings: {
          preferred_working_hours_per_day: 0,
          preferred_working_hours_per_day_enable: false
        },
        manager_id: [],
        roles: [
        ]
      }
    } else {
      if (user.manager){
        user.manager_id = { value: user.manager.id, label: user.manager.first_name + " " + user.manager.last_name + " " + user.manager.email }
      } else {
        user.manager_id = {}
      }
      user.roles = optionsFromCollection(this.props.roles, "value", ["label"], user.roles) 
    }
    console.log(user.roles)

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
                  initialValues={{ ...user }}
                  validate={this.validate}
                  validationSchema={this.validationSchema}
                  initialErrors={{...this.props.errors}}
                  onSubmit={this.onSubmit}
                  enableReinitialize={true}
                  submitButtonText= "Save"
                  returnButtonText= "Return"
                  returnButtonTo= "/users"
                  fields={inputFields}
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
  let roles = [
    { value: "user", label: "User" },
    { value: "manager", label: "Manager" },
    { value: "admin", label: "Admin" }
  ]

  return {profile: state.profile, user: state.users.user, users: state.users.users, errors: state.users.errors, roles: roles}
}
export default withRouter(connect(mapStateToProps)(Edit));
