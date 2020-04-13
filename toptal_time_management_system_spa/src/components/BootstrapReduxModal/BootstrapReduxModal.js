import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { put, takeEvery, all } from 'redux-saga/effects'

class BootstrapReduxModal extends Component {
  
  state = {
    hidden: true,
    color: "danger",
    description: "",
    currentActionType: "",
    currentActionparams: {}
  }

  toggleModal = () => {
    this.setState({
      hidden: !this.state.hidden,
    });
  }

  onConfirm = () => {
    this.props.store.dispatch({ type: this.state.currentActionType , payload: this.state.currentActionparams })
    this.setState({
      hidden: true,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.BootstrapReduxModal != null){
      this.setState({
        hidden: nextProps.BootstrapReduxModal.hidden, 
        color: nextProps.BootstrapReduxModal.color,
        description: nextProps.BootstrapReduxModal.description, 
        currentActionType: nextProps.BootstrapReduxModal.currentActionType,
        currentActionparams: nextProps.BootstrapReduxModal.currentActionparams
      });
    }
  }

  render() {
    return (
      <Modal isOpen={!this.state.hidden} toggle={this.toggleModal}
             className={'modal-danger ' + this.state.color}>
        <ModalHeader toggle={this.toggleModal}>Confirmation</ModalHeader>
        <ModalBody>
          {this.state.description}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.onConfirm}>Confirm</Button>{' '}
          <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  if (state.BootstrapReduxModal != null){
    return { BootstrapReduxModal: state.BootstrapReduxModal };
  }
  return {}
};

export default connect(mapStateToProps)(BootstrapReduxModal);
