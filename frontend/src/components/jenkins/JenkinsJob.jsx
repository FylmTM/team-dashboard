import React from 'react';
import { Spinner } from '@blueprintjs/core';

import './JenkinsJob.css';

export default function JenkinsJob({
  job: { url, name, status, buildNumber, buildUrl, isRunning, duration },
}) {
  return (
    <div className={`jenkins-job jenkins-job-${status} pt-ui-text-large`}>
      <span className="jenkins-job-name">
        <a href={url}>{name}</a>&nbsp;{buildNumber && (
          <a href={buildUrl}>(#{buildNumber})</a>
        )}
      </span>
      {isRunning && (
        <span className="jenkins-job-duration">
          <span className="jenkins-job-duration-text">{duration}</span>
          <Spinner small />
        </span>
      )}
    </div>
  );
}
