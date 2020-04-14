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
import { SHOW_BOOTSTRAP_REDUX_ALERT } from 'components/BootstrapReduxAlert/actions'

const recaptchaRef = React.createRef();
const recaptchaSiteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY

class ResetPassword extends Component {
  mounted = true;

  create = async (values, { setSubmitting, setErrors, setFieldValue }) => {
    setTimeout(() => {
      if(this.mounted){
        setSubmitting(false);
      }
    }, 2000);
     try {
        // get the token from parms and add it to the values
        
        console.log(values)
        console.log(this.props)
        let reset_password_token = new URLSearchParams(this.props.location.search).get("token")
        console.log(reset_password_token)
        values['reset_password_token'] = reset_password_token
        console.log(values)
        api.profile.patchNewPassword({data:{user: values}})
        .then(response => {
          console.log(response)
          if(response != null && response.errors  != null ) {
            console.log("updating errors")
            recaptchaRef.current.reset()
            console.log(response.errors)
            console.log(response.errors.reset_password_token)
            if(response.errors.reset_password_token != null){
              console.log("ISTRUE")
              store.dispatch({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: "The reset password token may be invalid or may be expired, please request a new link.", color: "danger", visible: true }});
              delete response.errors['reset_password_token']
            }
            setErrors(response.errors)
          } else if (response != null) {
            store.dispatch({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: "You password has been updated. You can now login with your new password.", color: "success", visible: true }});
          }
        })
      } catch(e) {
        setErrors(e)
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
                        initialValues={{ password: '', password_confirmation: '',recaptcha: '', reset_password_token: '' }}

                        validationSchema={yup.object().shape({
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
               
                            <h1>Reset Password</h1>
                            <p className="text-muted">Please choose a new password</p>
                            <BootstrapReduxAlert />
                            <InputGroup className="mb-3">
                            <FormFeedback className={errors.reset_password_token ? "valid-feedback d-block" : "invalid-feedback"}>{errors.reset_password_token}</FormFeedback>
                              <Input 
                                type="hidden" 
                                placeholder="Reset Password Token" 
                                autoComplete="reset_password_token"
                                name="reset_password_token"
                                tag={Field}
                                invalid={errors.reset_password_token}
                              />
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
                            <Button type='submit' color="success" block disabled={isSubmitting}>Confirm</Button>
                            <Link to="/login">
                              <Button color="primary" className="mt-3" block disabled={isSubmitting}>Return</Button>
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

export default ResetPassword;
