import React, { Component, lazy, Suspense } from 'react';
import {
  ListGroupItem,
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Table,
  FormFeedback,
  Input,
  InputGroup,
  Label,
  FormGroup
} from 'reactstrap';
import { Formik, Field, Form/*, ErrorMessage*/ } from 'formik';
import * as yup from 'yup';
import DataTable from 'react-data-table-component';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import actions from 'actions'
import store from 'store'
import {
  Link
} from "react-router-dom";
import { Profile } from 'views'
import Avatar from 'react-avatar';
import { LineDivider } from 'views'
import api from 'services/api'
import { toast } from 'services/utils'

class Edit extends Component {
  mounted = true;

  componentWillMount() {
    store.dispatch({type: actions.users.types.GET, payload: {updateItem: true, id: this.props.match.params.id}});
  }

  onSubmit = (values, { setSubmitting, errors, setErrors }) => {
    setTimeout(() => {
      if(this.mounted){
        setSubmitting(false);
      }
    }, 2000);

    try {
      api.users.patch({data:{user: values}, id: this.props.user.id})
      .then(response => {
        if(this.mounted, response != null && response.error != null){
          setErrors(response.error)
        } else if (this.mounted, response != null && response.id != null) {
          store.dispatch({type: actions.users.types.UPDATE_ITEM, payload: { user: response} });
          toast("success", "User record was updated with success")
        }
      })
    } catch(e) {
      if(this.mounted){
        setErrors(e)
      }
    }
  }

  componentWillUnmount(){
    this.mounted = false;
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
                <Formik
                  initialValues={{ ...this.props.user }}
                  validate={values => {
                    const errors = {};
                    if (!values.email) {
                      errors.email = 'Required';
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                      errors.email = 'Invalid email address';
                    }
                    return errors;
                  }}

                  validationSchema={yup.object().shape({
                    email: yup.string()
                      .required('Required'),
                    first_name: yup.string()
                      .required('Required'),
                    last_name: yup.string()
                      .required('Required')
                  })}

                  onSubmit={this.onSubmit}
                  enableReinitialize={true}
                >
                  {({ isSubmitting, errors, touched }) => (
                    <Form>
                      <FormGroup>
                        <Label htmlFor="first_name">First Name</Label>
                        <Input 
                          type="text" 
                          placeholder="First Name" 
                          autoComplete="First Name"
                          name="first_name"
                          tag={Field}
                          invalid={errors.first_name && touched.first_name}
                        />
                        <FormFeedback>{errors.first_name}</FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="first_name">Last Name</Label>
                        <Input 
                          type="text" 
                          placeholder="Last Name" 
                          autoComplete="Last Name"
                          name="last_name"
                          tag={Field}
                          invalid={errors.last_name && touched.last_name}
                        />
                        <FormFeedback>{errors.last_name}</FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="first_name">Email</Label>
                        <Input 
                          type="email" 
                          placeholder="email@example.com" 
                          autoComplete="Email"
                          name="email"
                          tag={Field}
                          invalid={errors.email && touched.email}
                        />
                        <FormFeedback>{errors.email}</FormFeedback>
                      </FormGroup>
                      <Row >
                        <div className="col-lg-6">
                        <Button color="success" className="btn btn-success btn-block" type="submit" disabled={isSubmitting}>Save</Button>
                        </div>
                        <div className="col-lg-6">
                          <Link className="btn btn-info btn-block" to={"/users/" + this.props.user.id  } >Return</Link>
                        </div>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </div>
            </Row>
          </div>
        </CardBody>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  let user = state.users.user
  if(user.id == null){
    user = {
      email: '',
      first_name: '',
      last_name: ''
    }
  }
  return {profile: state.profile, user: user}
}
export default withRouter(connect(mapStateToProps)(Edit));
