import React, { Component, lazy, Suspense } from 'react';
import ReactDOM from "react-dom";

class DurationEditor extends React.Component {

  state = {
    hours: 0,
    minutes: 0
  }
  setInputHourRef = (input) => {
    this.inputHourRef  = input;
  };

  setInputMinuteRef = (input) => {
    this.inputMinuteRef = input;
  };

  componentDidMount(){
    console.log(this.props)
    this.inputHourRef.focus();
    let seconds = this.props.value
    let hours = Math.floor(parseInt(this.props.value) / 3600)
    let minutes = Math.floor((parseInt(this.props.value) - (3600 * hours)) / 60)
    if(isNaN(hours)){
      hours = 0
    }
    if (isNaN(minutes)) {
      minutes = 0
    }
    this.setState({
      hours: hours,
      minutes: minutes
    })
  }

  getStyle() {
    return {
      width: '100%'
    };
  }

  getValue() {
    console.log("returning value")
    console.log(this.state.hours)
    console.log(this.state.minutes)
    let newValue = parseInt(this.state.hours*3600 + this.state.minutes*60)
    console.log(newValue)
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
    console.log("key press detected")
    console.log(event)
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
        event.preventDefault(); // Let's stop this event.
        event.stopPropagation(); // Really this time.        
        console.log("ArrowUp")
        var obj = {}
        obj[stateKey] = stateValue + 1
        this.setState(obj)
        return false
        break;
      case 'ArrowDown':
        event.preventDefault(); // Let's stop this event.
        event.stopPropagation(); // Really this time.     
        console.log("ArrowUp")
        var  obj = {}
        obj[stateKey] = stateValue - 1
        this.setState(obj)
        return false
        break;
      case 'ArrowLeft':
        nextElement.focus()
        break;
      case 'ArrowRight':
        nextElement.focus()
        break;
    }
  }
  inheritContainerStyles() {
    return true;
  }

  onChangeNeverCalled = (e) => {
    console.log("QQQQQQ")
    console.log(e)
  }

  render() {
    return (
      <div className="form-inline">
        <input 
          ref={this.setInputHourRef} 
          onKeyDown={this.handleKeyPress} 
          type="number" 
          min={0} 
          max={23} 
          onBlur={this.props.onBlur} 
          className="form-control" 
          style={{width: "50%"}} 
          value={this.state.hours}
          onChange={this.onChangeNeverCalled}
        />
        <input 
          ref={this.setInputMinuteRef} 
          onKeyDown={this.handleKeyPress} 
          type="number" 
          min={0} 
          max={59} 
          onBlur={this.props.onBlur} 
          className="form-control" 
          style={{width: "50%"}} 
          value={this.state.minutes}
          onChange={this.onChangeNeverCalled}
        />
      </div>
    );
  }
}

export default DurationEditor
