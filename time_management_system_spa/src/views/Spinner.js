import React from 'react';
import { Spinner as RSpinner } from 'reactstrap';

const Spinner = (props) => {
  return (
    <div>
      <RSpinner type="grow" color="primary" />
      <RSpinner type="grow" color="secondary" />
      <RSpinner type="grow" color="success" />
      <RSpinner type="grow" color="danger" />
      <RSpinner type="grow" color="warning" />
      <RSpinner type="grow" color="info" />
      <RSpinner type="grow" color="light" />
      <RSpinner type="grow" color="dark" />
    </div>
  );
}

export default Spinner;
