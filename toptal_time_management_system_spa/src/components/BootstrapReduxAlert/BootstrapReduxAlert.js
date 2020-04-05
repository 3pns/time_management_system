import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';

class BootstrapReduxAlert extends Component {
  constructor(props) {
    super(props);

    this.lastMessageDate = Date.now();
    this.newMessageKey = 0;
    this.state = {
      messages: {},
    };
  }

  handleToggle(e, messageKey) {
    // deep copy messages
    let messages = JSON.parse(JSON.stringify(this.state.messages));
    let message = {...messages[messageKey]};
    
    // garbage collect toggled alerts that had time to phase out aka older than 3 seconds
    var THREE_SECONDS = 3*1000;
    Object.keys(messages).map((key) => {
      if (!messages[key].visible && messages[key].dimissedAt != null && (Date.now() > ((new Date()) - messages[key].dimissedAt + THREE_SECONDS )) ) {
        delete messages[key];
      }
      return {}
    });

    // hide the clicked message
    message.visible = false;
    message.dimissedAt = Date.now();
    messages[messageKey] = message;

    //update state
    this.setState({ messages: messages });
  }

  componentDidUpdate(prevProps) {
    // only add new alerts
    if(this.props.date !== this.lastMessageDate && this.props.message != null && this.props.message !== "" ){
      let messages = JSON.parse(JSON.stringify(this.state.messages));
      // use map with auto-increment key to identify messages
      messages[this.newMessageKey] = {message: this.props.message, color: this.props.color, visible: true, dimissedAt: null};
      this.newMessageKey++;
      this.lastMessageDate = this.props.date;
      this.setState({ 
          messages: messages
      });
    }
  }

  render() {
    console.log("FML")
    console.log(this.props)
    console.log(this.state)
    return (
      <div id="bootstrapReduxAlert">
        {Object.keys(this.state.messages).map((key) => {
          return (
              <Alert key={key} color={this.state.messages[key].color} isOpen={this.state.messages[key].visible}  toggle={((e) => this.handleToggle(e, key))} > {this.state.messages[key].message} </Alert>
            )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log("RERENDERING")
  console.log(state)
  if (state.BootstrapReduxAlert != null){
    return { message: state.BootstrapReduxAlert.message, color: state.BootstrapReduxAlert.color, visible: state.BootstrapReduxAlert.visible, date: Date.now()};
  }
  return {}
};

export default connect(mapStateToProps)(BootstrapReduxAlert);
