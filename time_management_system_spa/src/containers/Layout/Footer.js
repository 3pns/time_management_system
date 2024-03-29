import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class Footer extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a href={process.REACT_APP_API_BASE_URL}>Time Management System</a> &copy; 2020.</span>
      </React.Fragment>
    );
  }
}

// DefaultFooter.propTypes = propTypes;
// DefaultFooter.defaultProps = defaultProps;

export default Footer;
