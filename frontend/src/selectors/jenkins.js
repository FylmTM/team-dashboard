import { createSelector } from 'reselect';
import * as jobStatus from '../constants/jobStatus';
import moment from 'moment';

const jenkinsSelector = state => state.jenkins.data;

function determineBuildStatus(build) {
  if (build == null) {
    return jobStatus.UNKNOWN;
  }

  if (['SUCCESS'].includes(build.status)) {
    return jobStatus.SUCCESS;
  }

  if (['FAILURE', 'UNSTABLE'].includes(build.status)) {
    return jobStatus.FAILURE;
  }

  return jobStatus.UNKNOWN;
}

function determineJobRunningDuration(job) {
  if (job.lastBuild.running) {
    const duration = moment.duration(job.lastBuild.duration);
    return `${duration.minutes()}m ${duration.seconds()}s`;
  }

  return '0:0:0';
}

export const jenkinsBuildDataSelector = createSelector(
  jenkinsSelector,
  jenkins =>
    jenkins.map(job => {
      return {
        name: job.name,
        status: determineBuildStatus(job.lastBuild),
        isRunning: job.lastBuild.running,
        duration: determineJobRunningDuration(job),
        buildNumber: job.lastBuild.number,
      };
    })
);
