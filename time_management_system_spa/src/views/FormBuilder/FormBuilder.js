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
  FormGroup,
  Label
} from 'reactstrap';
import Select from 'react-select';

class FormBuilder extends Component {
  mounted = true

  selectStates = {
    myExampleField: {
      initialValueLoaded: false,
      optionsLoaded: false
    }
  }

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
    // deep copies values, directly modifying values will break formik interna state
    let parsedValues = JSON.parse(JSON.stringify(values))
    // serialize all multi forms values to array of data
    this.props.fields.map((field) => {
      // multi select
      if(field.inputType == "select" && field.multiple && parsedValues[field.name]){
        parsedValues[field.name] = parsedValues[field.name].map((pair) => {
          if(pair){
            return pair.value
          }
        })
      // standard select
      } else if (field.inputType == "select"){
        if(parsedValues[field.name]){
          parsedValues[field.name] = parsedValues[field.name].value
        }
        
      }
    })

    setTimeout(() => {
      if(this.mounted){
        setSubmitting(false);
      }
    }, 2000);
    this.props.onDispatch(parsedValues)
  }

  onSelectChange = (field, option, setFieldValue) => {
    setFieldValue(field.name, option )
  }

  parseErrorsToString = (errors, field) => {
    var fieldErrors = ""
    var errorsArray = []
    // formik errors
    if (typeof errors[field.name] === 'string' || errors[field.name] instanceof String){
      errorsArray.push(errors[field.name])
    // api errors
    } else if(Array.isArray(errors[field.name])){
      errorsArray.push(errors[field.name])
    } else if (Array.isArray(errors[field.name + '_id'])){
      errorsArray.push(errors[field.name + '_id'])
    } else if (Array.isArray(errors[field.name.replace('_id', '')])){
      errorsArray.push(errors[field.name.replace('_id', '')])
    }
    errorsArray.map((error) =>{
      fieldErrors = fieldErrors + " "+ error
    })
    return fieldErrors
  }

  fieldNameEqual(field, name){
    let allowedNames = [field.name , field.name + '_id', field.name.replace('_id', '')]
    return allowedNames.includes(name)
  }

  containEntity = (collection, name) => {
    if(collection[name] || collection[name + '_id'] || collection[name.replace('_id', '')]){
      return true
    } else {
      return false
    }

  }
  
  render() {
    const fields = this.props.fields
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
        {({ isSubmitting, errors, touched, setFieldValue }) => (
          <Form className="form-group">
          {fields.map((field) => {
            if(field.renderer){
              return(
                field.renderer(field, errors, touched)
              )
            } else if (field.inputType == "select"){
              if(!field.choices){
                field.choices = []
              }
              const selectValue = field.choices ? field.choices.find(option => option.value === field.value) : ''

              // re render after choices or initial values have been loaded
              let key = field.name
              if ( (field.multiple && this.props.initialValues[field.name].length == 0) ||
                 (!field.multiple && Object.keys(this.props.initialValues[field.name]).length == 0) ){
                key = key + "-loading-initial-values"
              }
              if ( field.choices.length == 0){
                key = key + "-loading-choices"
              }

              // for each string in the array on the top build the default values that ill be populates
              return (
                <FormGroup key={key} >
                  <Label htmlFor={field.name}>{field.label}</Label>
                    <Select
                      name={field.name}
                      //value={selectValue}
                      defaultValue={this.props.initialValues[field.name]}
                      //onChange={(option: Option) => setFieldValue(field.name, option)}
                      onChange={(option: Option) => this.onSelectChange(field, option,  setFieldValue)}
                      //getOptionValue ={(option)=> option.value}
                      options={field.choices}
                      tag={Field}
                      invalid={ this.containEntity(errors, field.name) && this.containEntity(touched, field.name)}
                      isMulti={field.multiple ? true : false}
                      
                    />
                  <FormFeedback>{ this.parseErrorsToString(errors, field) }</FormFeedback>
                </FormGroup>
              )
            } else {
              return(
                <FormGroup key={field.name} >
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <Input 
                    type={field.inputType}
                    placeholder={field.placeholder ? field.placeholder : field.label}
                    autoComplete={field.label}
                    name={field.name}
                    tag={Field}
                    invalid={ this.containEntity(errors, field.name) && this.containEntity(touched, field.name)}
                    className="disable-form-check-input form-control"
                  >
                  </Input>
                  <FormFeedback>{ this.parseErrorsToString(errors, field) }</FormFeedback>
                </FormGroup>
              )
            }
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
