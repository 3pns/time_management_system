import React, { Component, lazy, Suspense } from 'react';
import ReactDOM from "react-dom";

const allowedInput = [0,1,2,3,4,5,6,7,8,9]

class DurationEditor extends React.Component {

  constructor(props) {
  super(props);
  let hours = Math.floor(parseInt(this.props.value) / 3600)
  let minutes = Math.floor((parseInt(this.props.value) - (3600 * hours)) / 60)
    if(isNaN(hours)){
      hours = 0
    }
    if (isNaN(minutes)) {
      minutes = 0
    }
    this.state = {
      hours: hours,
      minutes: minutes
    }
}

  setInputHourRef = (input) => {
    this.inputHourRef  = input;
  };

  setInputMinuteRef = (input) => {
    this.inputMinuteRef = input;
  };

  componentDidMount(){
    this.inputHourRef.focus();
    this.inputHourRef.value = this.state.hours
    this.inputMinuteRef.value = this.state.minutes
  }

  updateState = (params) => {
    let { hours, minutes } = params

    hours = parseInt(hours)
    minutes = parseInt(minutes)

    if(hours == null || isNaN(hours) ){
      hours = this.state.hours
    }
    if(minutes == null || isNaN(minutes) ){
      minutes = this.state.minutes
    }
    if(hours < 0){
      hours = 0
    } else if (hours > 24) {
      hours = 24
    }
    if(minutes < 0){
      minutes = 0
    } else if (minutes > 59){
      minutes = 59
    }
    if(hours == 24){
      minutes = 0
    }
    this.state.hours = hours
    this.state.minutes = minutes
    this.inputHourRef.value = hours
    this.inputMinuteRef.value = minutes
  }

  getStyle() {
    return {
      width: '100%'
    };
  }

  getValue() {
    let newValue = parseInt(this.state.hours*3600 + this.state.minutes*60)
    return  { duration: newValue };
  }

  getInputNode() {
    const domNode = ReactDOM.findDOMNode(this);
    if (domNode.tagName === 'INPUT') {
      return domNode;
    }

    return domNode.querySelector('input:not([type=hidden])');
  }

  setNewValue() {

  }

  handleKeyPress = ( event ) => {
    // do something, or not, with the keydown event, maybe event.preventDefault()
    let activeElement = null
    let nextElement = null
    let stateKey = ""
    let stateValue = 0
    if ( document.activeElement === this.inputHourRef ) {
        activeElement = this.inputHourRef
        nextElement = this.inputMinuteRef
        stateKey = "hours"
        stateValue = this.state.hours
    } else if ( document.activeElement === this.inputMinuteRef ) {
        activeElement = this.inputMinuteRef
        nextElement = this.inputHourRef
        stateKey = "minutes"
        stateValue = this.state.minutes
    } else {
      return
    }



    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        event.stopPropagation();     
        var obj = {}
        obj[stateKey] = stateValue + 1
        this.updateState(obj)
        return false
        break;
      case 'ArrowDown':
        event.preventDefault();
        event.stopPropagation();
        var  obj = {}
        obj[stateKey] = stateValue - 1
        this.updateState(obj)
        return false
        break;
      case 'ArrowLeft':
        nextElement.focus()
        break;
      case 'ArrowRight':
        nextElement.focus()
        break;
    }
    if(allowedInput.includes(event.key)){
      return true
    }
  }
  inheritContainerStyles() {
    return true;
  }

  render() {
    console.log("INIT STATE")
    console.log(this.state)
    console.log(this.props)
    return (
      <div className="form-inline">
        <span 
          className="hide-numeric-arrows"
          style={{
          "position": "absolute",
          "left": "50%"
        }}>:</span>
        <input 
          ref={this.setInputHourRef}
          name="hours"
          onKeyDown={this.handleKeyPress} 
          type="number" 
          min={0} 
          max={24} 
          onBlur={this.props.onBlur} 
          className="form-control" 
          style={{width: "50%", borderRight: "none", "borderRadius": "0.25rem 0rem 0rem 0.25rem"}} 
          onChange={(e) => this.updateState({hours: e.currentTarget.value})}
        />
        <input 
          ref={this.setInputMinuteRef}
          name="secondss"
          onKeyDown={this.handleKeyPress} 
          type="number" 
          min={0} 
          max={59} 
          onBlur={this.props.onBlur} 
          className="form-control" 
          style={{width: "50%", borderLeft: "none", "borderRadius": "0rem 0.25rem 0.25rem 0rem"}} 
          onChange={(e) => this.updateState({minutes: e.currentTarget.value})}
        />
      </div>
    );
  }
}

export default DurationEditor
