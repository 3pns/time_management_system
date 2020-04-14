import React, { Component } from 'react';
import { Row } from 'reactstrap';

class LineDivider extends Component {

  render() {
    let marginBottom = "1rem"
    let marginTop = "1rem"
    if (this.props.marginBottom){
      marginBottom = this.props.marginBottom
    }
    if (this.props.marginTop){
      marginTop = this.props.marginTop
    }    
    return (
      <Row style={{
        "borderBottom": "solid", 
        "marginBottom": marginBottom,
        "marginTop": marginTop,
        "borderBottomColor": "rgb(200, 206, 211)",
        "borderBottomWidth": "1px"
      }}/>
    )
  }
}

export default LineDivider
