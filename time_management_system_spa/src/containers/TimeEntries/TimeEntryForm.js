import React, { Component, lazy, Suspense } from 'react';
import ReactDOM from "react-dom";
import {
  Badge, 
  Card, 
  CardBody, 
  CardHeader, 
  Col, 
  Pagination, 
  PaginationItem, 
  PaginationLink, 
  Row, 
  Table,
  ListGroupItem,
  Button,
  Input, 
  InputGroup, 
  InputGroupAddon, 
  InputGroupText, 
  FormFeedback
} from 'reactstrap';
import { Formik, Field, Form/*, ErrorMessage*/ } from 'formik';
import * as yup from 'yup';
import store from 'store'
import actions from 'actions'
import DataGrid from 'react-data-grid';
import { secondsToString, stringToSeconds } from './utils'
import { put, takeEvery, all } from 'redux-saga/effects'
import { SHOW_BOOTSTRAP_REDUX_MODAL } from 'components/BootstrapReduxModal/actions'
import moment from 'moment'
import DurationEditor from './DurationEditor'
import { toast } from 'services/utils'
import { SingleDatePicker } from 'react-dates';

const falseFunc = ()=>false;

class TimeEntryForm extends Component {
  mounted = true;
  durationEditor = React.createRef()

  createTimeEntry = (values, { setSubmitting, errors, setErrors }) => {
    console.log(values)
    console.log(values)
    let time_entry = values
    time_entry.date = this.state.date.toISOString()
    time_entry.duration = this.durationEditor.current.getValue().duration
    time_entry.user_id = this.props.userId

    setTimeout(() => {
      if(this.mounted){
        setSubmitting(false);
      }
    }, 1000);
    store.dispatch({type: actions.time_entries.types.CREATE, payload: { data: {time_entry: time_entry} } });
  }
  state = {
    date: moment(),
  }
  onChange = time => this.setState({ time })

  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    return (
      <React.Fragment>
        <Formik
          className="col-md-12"
          initialValues={{ note: '' }}
          validationSchema={yup.object().shape({
            note: yup.string()
              .max(255)
          })}

          onSubmit={this.createTimeEntry}
        >
          {({ isSubmitting, errors, touched, props }) => (
            <Form className="col-12">
              <Row >
              <div className="col-md-2">
                {errors.count}
                <Input type="hidden" name="user_id" />
                <SingleDatePicker
                  date={this.state.date} // momentPropTypes.momentObj or null
                  onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                  focused={this.state.focused} // PropTypes.bool
                  onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                  id="time_entry_form_date_picker" // PropTypes.string.isRequired,
                  enableOutsideDays={true}
                  isOutsideRange={falseFunc}
                />
                <FormFeedback>{errors.date}</FormFeedback>
              </div>
              <div className="col-md-3">
                <DurationEditor ref={this.durationEditor}/>
                <FormFeedback>{errors.duration}</FormFeedback>
              </div>
              <div className="col-md-5">
                <Input 
                  className="form-control" 
                  name="note" 
                  type="text" 
                  placeholder="Note" 
                  tag={Field} 
                  block="true"
                  invalid={errors.note && touched.note}
                />
                <FormFeedback>{errors.note}</FormFeedback>            
              </div>
              <div className="col-md-2">
                <Button color="success" className="form-control btn btn-block" type="submit" disabled={isSubmitting} block={true} >Create</Button>
              </div>
              </Row>
            </Form>
          )}
        </Formik>
      </React.Fragment>
    )
  }
}
export default TimeEntryForm;
