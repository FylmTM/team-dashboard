import {createSelector} from 'reselect';

const jiraSelector = state => state.jira;
const teamSelector = state => state.team;

function belongToUser(username) {
    return issue => issue.assigneeUsername === username;
}

function hasStatus(possibleStatuses) {
    return issue => possibleStatuses.includes(issue.status.name);
}

function filterIssuesBlocked(username, issues) {
    return issues
        .filter(belongToUser(username))
        .filter(hasStatus(["Blocked"]));
}

function filterIssuesInProgress(username, issues) {
    return issues
        .filter(belongToUser(username))
        .filter(hasStatus(["In Progress"]));
}

function filterIssuesReview(username, issues) {
    return issues
        .filter(belongToUser(username))
        .filter(hasStatus(["Review"]));
}

export const jiraDataSelector = createSelector(
    teamSelector,
    jiraSelector,
    (team, jira) => ({
        sprintName: jira.sprint.name,
        members: team.members.map(member => ({
            name: member.name,
            issues: {
                blocked: filterIssuesBlocked(member.username, jira.issues),
                inProgress: filterIssuesInProgress(member.username, jira.issues),
                review: filterIssuesReview(member.username, jira.issues)
            }
        }))
    })
);
