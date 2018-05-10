import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from '@blueprintjs/core';

import JenkinsJobs from './JenkinsJobs';

export function JenkinsJobsLoaded({ isLoaded }) {
  if (!isLoaded) {
    return (
      <div className="center">
        <Spinner />
      </div>
    );
  }

  return <JenkinsJobs />;
}

const mapStateToProps = state => {
  return {
    isLoaded: state.jenkins.loaded,
  };
};

export default connect(mapStateToProps)(JenkinsJobsLoaded);
