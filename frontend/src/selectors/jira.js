import { createSelector } from 'reselect';
import { calculateBusinessDays } from '../util/time';

const jiraSelector = state => state.jira.data;
const teamSelector = state => state.team.data;

function belongToUser(username) {
  return issue => issue.assigneeUsername === username;
}

function hasStatus(possibleStatuses) {
  return issue => possibleStatuses.includes(issue.status.name);
}

function filterIssuesBlocked(username, issues) {
  return issues.filter(belongToUser(username)).filter(hasStatus(['Blocked']));
}

function filterIssuesInProgress(username, issues) {
  return issues
    .filter(belongToUser(username))
    .filter(hasStatus(['In Progress']));
}

function filterIssuesReview(username, issues) {
  return issues.filter(belongToUser(username)).filter(hasStatus(['Review']));
}

function enrichWithAge(issue) {
  let transition = issue.transitions
    .reverse()
    .find(transition => transition.from === 'Open');

  if (transition == null) {
    transition = issue.transitions
      .reverse()
      .find(transition => transition.from === 'To Do');
  }

  return {
    ...issue,
    age: calculateBusinessDays(transition.created),
  };
}

export const jiraDataSelector = createSelector(
  teamSelector,
  jiraSelector,
  (team, jira) => ({
    sprintName: jira.sprint.name,
    members: team.members.map(member => ({
      name: member.name,
      issues: {
        blocked: filterIssuesBlocked(member.username, jira.issues).map(
          enrichWithAge
        ),
        inProgress: filterIssuesInProgress(member.username, jira.issues).map(
          enrichWithAge
        ),
        review: filterIssuesReview(member.username, jira.issues).map(
          enrichWithAge
        ),
      },
    })),
  })
);
