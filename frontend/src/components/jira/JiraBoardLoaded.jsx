import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from '@blueprintjs/core';

import JiraBoard from './JiraBoard';

export function JiraBoardLoaded({ isLoaded }) {
  if (!isLoaded) {
    return (
      <div className="center">
        <Spinner />
      </div>
    );
  }

  return <JiraBoard />;
}

const mapStateToProps = state => {
  return {
    isLoaded: state.jira.loaded,
  };
};

export default connect(mapStateToProps)(JiraBoardLoaded);
