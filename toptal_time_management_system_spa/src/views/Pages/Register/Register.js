import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, FormFeedback } from 'reactstrap';
import { Formik, Field, Form/*, ErrorMessage*/ } from 'formik';
import * as yup from 'yup';
import BootstrapReduxAlert from 'components/BootstrapReduxAlert'
import ReCAPTCHA from "react-google-recaptcha";
import api from 'services/api'
import actions from 'actions'
import store from 'store'
import { Link } from 'react-router-dom';

const recaptchaRef = React.createRef();
const recaptchaSiteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY

class Register extends Component {
  mounted = true;
  state = {
    alreadyUsedEmails: []
  }

  create = async (values, { setSubmitting, setErrors, setFieldValue }) => {
    setTimeout(() => {
      if(this.mounted){
        setSubmitting(false);
      }
    }, 2000);
     try {
        console.log(values)
        api.profile.create({data:{user: values}})
        .then(response => {
          console.log(response)
          if(response != null && response.errors  != null ) {
            console.log("updating errors")
            if(response.errors.email == "has already been taken"){
              let alreadyUsedEmails = this.state.alreadyUsedEmails
              alreadyUsedEmails.push(values.email)
              this.setState({
               alreadyUsedEmails: alreadyUsedEmails 
              })
            }
            recaptchaRef.current.reset()
            setErrors(response.errors)
            //setFieldValue({field: 'recaptcha', value: ''})

            
          } else if (response != null && response.id != null) {
            // todo login and redirect user automatically
            store.dispatch({type: actions.profile.types.UPDATE, payload: { profile: response} });
          }
        })
      } catch(e) {
        setErrors(e)
        // or setStatus(transformMyApiErrors(e))
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
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  {
                      <Formik
                        initialValues={{ first_name: '', last_name: '', email: '', password: '', password_confirmation: '', recaptcha: '' }}
                        validate={values => {
                          const errors = {};
                          if (!values.email) {
                            errors.email = 'Required';
                          } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                          ) {
                            errors.email = 'Invalid email address';
                          } else if (
                            this.state.alreadyUsedEmails.includes(values.email)
                          ) {
                            errors.email = "Email has already been taken";
                          }

                          return errors;
                        }}

                        validationSchema={yup.object().shape({
                          first_name: yup.string()
                            .required('Required'),
                          last_name: yup.string()
                            .required('Required'),
                          email: yup.string()
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
                          recaptcha: yup.string()
                            .required('Required')
                            .ensure(),
                        })}

                        onSubmit={this.create}
                      >
                        {({ isSubmitting, errors, touched, setFieldValue }) => (
                          <Form>
               
                            <h1>Register</h1>
                            <p className="text-muted">Create your account</p>
                            <BootstrapReduxAlert />

                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-user"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input 
                                type="text" 
                                placeholder="First Name" 
                                autoComplete="first_name" 
                                name="first_name" 
                                tag={Field}
                                invalid={errors.first_name && touched.first_name}
                                 />
                              <FormFeedback>{errors.first_name}</FormFeedback>
                            </InputGroup>

                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-user"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input 
                                type="text" 
                                placeholder="Last Name" 
                                autoComplete="last_name" 
                                name="last_name" 
                                tag={Field}
                                invalid={errors.last_name && touched.last_name}
                                 />
                              <FormFeedback>{errors.last_name}</FormFeedback>
                            </InputGroup>

                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>@</InputGroupText>
                              </InputGroupAddon>
                              <Input 
                                type="email" 
                                placeholder="Email" 
                                autoComplete="email" 
                                name="email" 
                                tag={Field}
                                invalid={errors.email && touched.email}
                                 />
                              <FormFeedback>{errors.email}</FormFeedback>
                            </InputGroup>


                            <InputGroup className="mb-3">
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

                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-lock"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input 
                                type="password" 
                                placeholder="Password confirmation" 
                                autoComplete="current-password"
                                name="password_confirmation"
                                tag={Field}
                                invalid={errors.password_confirmation && touched.password_confirmation}
                              />
                              <FormFeedback>{errors.password_confirmation}</FormFeedback>
                            </InputGroup>
                            <InputGroup className="mb-3">
                              <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={ recaptchaSiteKey }
                                onChange={(response) => { setFieldValue("recaptcha", response); }}
                                //onChange={onChange}
                              />
                              <FormFeedback>{errors.base}</FormFeedback>
                            </InputGroup>
                            <Button type='submit' color="success" block disabled={isSubmitting}>Create Account</Button>
                            <Link to="/login">
                              <Button color="primary" className="mt-3" block disabled={isSubmitting}>Login</Button>
                            </Link>
                          </Form>
                        )}
                      </Formik> 
                }

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
