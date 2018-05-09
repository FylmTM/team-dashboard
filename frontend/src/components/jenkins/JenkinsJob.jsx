import React from 'react';
import {Spinner} from '@blueprintjs/core';

import './JenkinsJob.css';

export default function JenkinsJob({job: {name, status, buildNumber, isRunning, duration}}) {
    return (
        <div className={`jenkins-job jenkins-job-${status} pt-ui-text-large`}>
            <span className="jenkins-job-name">{name} {buildNumber && `(#${buildNumber})`}</span>
            {
                isRunning && <span className="jenkins-job-duration">
                    <span className="jenkins-job-duration-text">
                        {duration}
                    </span>
                    <Spinner small/>
                </span>
            }
        </div>
    )
}
