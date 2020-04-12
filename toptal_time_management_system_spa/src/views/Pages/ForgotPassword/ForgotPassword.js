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

class ForgotPassword extends Component {
  mounted = true;

  create = async (values, { setSubmitting, setErrors, setFieldValue }) => {
    setTimeout(() => {
      if(this.mounted){
        setSubmitting(false);
      }
    }, 2000);
     try {
        console.log(values)
        api.profile.askNewPassword({data:{user: values}})
        .then(response => {
          console.log(response)
          if(response != null && response.errors  != null ) {
            console.log("updating errors")
            recaptchaRef.current.reset()
            setErrors(response.errors)
            //setFieldValue({field: 'recaptcha', value: ''})
          } else if (response != null) {
            store.dispatch({type: SHOW_BOOTSTRAP_REDUX_ALERT, payload: { message: "We have sent an email with a confirmation link to your email address. Please allow 5-10 minutes for this message to arrive.", color: "success", visible: true }});
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
                        initialValues={{ email: '', recaptcha: '' }}
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

                          recaptcha: yup.string()
                            .required('Required')
                            .ensure(),
                        })}

                        onSubmit={this.create}
                      >
                        {({ isSubmitting, errors, touched, setFieldValue }) => (
                          <Form>
               
                            <h1>New Password</h1>
                            <p className="text-muted">Request a new password</p>
                            <BootstrapReduxAlert />

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

export default ForgotPassword;
