import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { 
  Button, 
  Card, 
  CardBody, 
  CardGroup, 
  Col, 
  Container, 
  /* Form*/ 
  Input, 
  InputGroup, 
  InputGroupAddon, 
  InputGroupText, 
  Row, 
  FormFeedback, 
  Table,
  Badge 
} from 'reactstrap';
import { Formik, Field, Form/*, ErrorMessage*/ } from 'formik';
import * as yup from 'yup';
import BootstrapReduxAlert from 'components/BootstrapReduxAlert'
import actions from 'actions';
import api from 'services/api';
import store from 'store'
import Avatar from 'react-avatar';

class Profile extends Component {

  render() {
    return (
      <div>
      <Row style={{display: "flex"}}>
        <Avatar name={ this.props.first_name + " " + this.props.last_name } 
                className="img-avatar text-center img-fluid" 
                size="200"
                style={{margin: "auto"}}
        />
      </Row>
      <Row>
        <div className="col-lg-3"/>
        <div className="col-lg-6">
          <Table responsive style={{marginTop: "20px"}} >
            <tbody>
              <tr>
                <td><strong>First Name</strong></td>
                <td>{ this.props.user.first_name }</td>
              </tr>
              <tr>
                <td><strong>Last Name</strong></td>
                <td>{ this.props.user.last_name }</td>
              </tr>
              <tr>
                <td><strong>Email</strong></td>
                <td>{ this.props.user.email }</td>
              </tr>
              <tr>
                <td><strong>Created At</strong></td>
                <td>{ this.props.user.created_at }</td>
              </tr>
              <tr>
                <td><strong>Updated At</strong></td>
                <td>{ this.props.user.updated_at }</td>
              </tr>

            </tbody>
          </Table>
        </div>
      </Row>
      </div>
    )
  }
}

export default Profile
