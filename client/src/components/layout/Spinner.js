import React, { Fragment } from 'react';
// import spinner from './spinner.gif';

export default () => (
  <Fragment>
    <i
      className='fa fa-spinner fa-pulse fa-3x fa-fw mx-auto d-flex'
      style={{ alignItems: 'center', margin: '100px' }}
    ></i>
    <span className='sr-only'>Loading...</span>
  </Fragment>
);
