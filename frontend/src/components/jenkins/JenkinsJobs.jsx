import React from 'react';
import {connect} from 'react-redux'
import {jenkinsBuildDataSelector} from '../../selectors';

import JenkinsJob from './JenkinsJob';
import './JenkinsJobs.css';

export function JenkinsJobs({jobs}) {
    return (
        <div className="jenkins-jobs">
            {jobs.map(job => <JenkinsJob key={job.name} job={job}/>)}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        jobs: jenkinsBuildDataSelector(state)
    }
};

export default connect(mapStateToProps)(JenkinsJobs)

