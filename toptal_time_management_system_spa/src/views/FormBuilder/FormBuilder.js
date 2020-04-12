import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { 
  Formik, 
  Field,
  Form/*, ErrorMessage*/ 
} from 'formik';
import {
  Button,
  Row,
  FormFeedback,
  Input,
  InputGroup,
  Label,
  FormGroup
} from 'reactstrap';

class FormBuilder extends Component {
  mounted = true

  setFormRef = (form) => {
    this.formRef = form;
  };

  componentWillUnmount(){
    this.mounted = false;
  }

  componentDidUpdate = () => {
    const { errors } = this.props;
    if(this.formRef){
      this.formRef.setErrors(errors);
    }
  }

  onSubmit = (values, { setSubmitting, errors, setErrors }) => {
    setTimeout(() => {
      if(this.mounted){
        setSubmitting(false);
      }
    }, 2000);
    this.props.onDispatch(values)
  }

  render() {
    return (  
      <Formik
        innerRef={this.setFormRef}
        initialValues={{ ...this.props.initialValues }}
        validate={this.props.validate}
        validationSchema={this.props.validationSchema}
        initialErrors={{...this.props.errors}}
        onSubmit={this.onSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="form-group">
          {this.props.fields.map((field) => {
              return(
                <FormGroup key={field.name} >
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <Input 
                    type={field.type}
                    placeholder={field.placeholder ? field.placeholder : field.label}
                    autoComplete={field.label}
                    name={field.name}
                    tag={Field}
                    invalid={errors[field.name] && touched[field.name]}
                    className="disable-form-check-input form-control"
                  />
                  <FormFeedback>{errors[field.name]}</FormFeedback>
                </FormGroup>
              )
            // }

          })}

            <Row >
              {this.props.hideReturnButton 
              ?
              <React.Fragment>
                <div className="col-lg-3"/>
                <div className="col-lg-6">
                  <Button color="success" className="btn btn-success btn-block" type="submit" disabled={isSubmitting}>{this.props.submitButtonText}</Button>
                </div>
              </React.Fragment>
              :
              <React.Fragment>
                <div className="col-lg-6">
                  <Button color="success" className="btn btn-success btn-block" type="submit" disabled={isSubmitting}>{this.props.submitButtonText}</Button>
                </div>
                <div className="col-lg-6">
                  <Link className="btn btn-info btn-block" to={ this.props.returnButtonTo }>{ this.props.returnButtonText }</Link>
                </div>
              </React.Fragment>
              }

            </Row>
          </Form>
        )}
      </Formik>
    )
  }
}

export default FormBuilder
