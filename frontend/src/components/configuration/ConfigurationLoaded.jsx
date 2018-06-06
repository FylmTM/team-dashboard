import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from '@blueprintjs/core';

import Configuration from './Configuration';

export function ConfigurationLoaded({ isLoaded }) {
  if (!isLoaded) {
    return (
      <div>
        <Spinner small />
      </div>
    );
  }

  return <Configuration />;
}

const mapStateToProps = state => {
  return {
    isLoaded: state.configuration.loaded,
  };
};

export default connect(mapStateToProps)(ConfigurationLoaded);
