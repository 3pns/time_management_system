import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container /*, Form*/, Input, InputGroup, InputGroupAddon, InputGroupText, Row, FormFeedback } from 'reactstrap';
import { Formik, Field, Form/*, ErrorMessage*/ } from 'formik';
import * as yup from 'yup';
import BootstrapReduxAlert from 'components/BootstrapReduxAlert'
import actions from 'actions';
import api from 'services/api';
import store from 'store'

class Login extends Component {
  mounted = true;

  login = (values, { setSubmitting, errors, setErrors }) => {
    setTimeout(() => {
      if(this.mounted){
        setSubmitting(false);
      }
    }, 2000);

    try {
      api.profile.login({data:{user: values}})
      .then(response => {
        if(this.mounted, response != null && response.error == "Invalid Email or password."){
            setErrors({email: "Invalid Email or password.", password: "Invalid Email or password."})
        } else if (this.mounted, response != null && response.id != null) {
          store.dispatch({type: actions.profile.types.UPDATE, payload: { profile: response} });
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
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                      
                      <Formik
                        initialValues={{ email: '', password: '' }}
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
                          password: yup.string()
                            .min(6, 'Too Short!')
                            .required('Required')
                            .ensure(),
                        })}

                        onSubmit={this.login}
                      >
                        {({ isSubmitting, errors, touched }) => (
                          <Form>

                            <h1>Login</h1>
                            <p className="text-muted">Sign In to your account</p>
                            <BootstrapReduxAlert />
                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-user"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input 
                                type="email" 
                                placeholder="Username" 
                                autoComplete="username" 
                                name="email" 
                                tag={Field}
                                invalid={errors.email && touched.email}
                                 />
                              <FormFeedback>{errors.email}</FormFeedback>
                            </InputGroup>


                            <InputGroup className="mb-4">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-lock"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input 
                                type="password" 
                                placeholder="Password" 
                                autoComplete="current-password"
                                name="password"
                                tag={Field}
                                invalid={errors.password && touched.password}
                              />
                              <FormFeedback>{errors.password}</FormFeedback>
                            </InputGroup>

                            <Row>
                              <Col xs="6">
                                <Button color="primary" className="px-4" type="submit" disabled={isSubmitting}>Login</Button>
                              </Col>
                              <Col xs="6" className="text-right">
                                <Link to="/forgot_password">
                                  Forgot password?
                                </Link>
                              </Col>
                            </Row>
                          </Form>
                        )}
                      </Formik>

                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 ">
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Create a new account. It's free !</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
