import {createSelector} from 'reselect';
import * as jobStatus from '../constants/jobStatus';
import moment from 'moment';

const jenkinsSelector = state => state.jenkins;

function determineBuildStatus(build) {
    if (build == null) {
        return jobStatus.UNKNOWN;
    }

    if (["SUCCESS"].includes(build.status)) {
        return jobStatus.SUCCESS;
    }

    if (["FAILURE", "UNSTABLE"].includes(build.status)) {
        return jobStatus.FAILURE;
    }

    return jobStatus.UNKNOWN;
}

function determineJobStatus(job) {
    const currentBuildStatus = determineBuildStatus(job.currentBuild);
    if (currentBuildStatus !== jobStatus.UNKNOWN) {
        return currentBuildStatus;
    }

    const previousBuildStatus = determineBuildStatus(job.previousBuild);
    if (previousBuildStatus !== jobStatus.UNKNOWN) {
        return previousBuildStatus;
    }

    return jobStatus.UNKNOWN;
}

function determineJobIsRunning(job) {
    return job.currentBuild != null && job.currentBuild.isRunning;
}

function determineJobRunningDuration(job) {
    if (determineJobIsRunning(job)) {
        const duration = moment.duration(job.currentBuild.duration);
        return `${duration.minutes()}m ${duration.seconds()}s`;
    }

    return "0:0:0";
}

function determineJobBuildNumber(job) {
    return job.currentBuild ? job.currentBuild.number : null;
}

export const jenkinsBuildDataSelector = createSelector(
    jenkinsSelector,
    (jenkins) => jenkins
        .map(job => {
            return {
                name: job.name,
                status: determineJobStatus(job),
                isRunning: determineJobIsRunning(job),
                duration: determineJobRunningDuration(job),
                buildNumber: determineJobBuildNumber(job)
            }
        })
);
