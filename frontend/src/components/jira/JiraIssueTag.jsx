import React from 'react';

import * as jiraIssue from '../../constants/jiraIssue';

import './JiraIssueTag.css';

export default function IssueTag({ issue }) {
  const { key, summary, age } = issue;

  let ageLevel = 'normal';
  if (age && age >= jiraIssue.ISSUE_AGE_WARNING) {
    ageLevel = 'warning';
  }
  if (age && age >= jiraIssue.ISSUE_AGE_DANGER) {
    ageLevel = 'danger';
  }

  return (
    <span className={`jira-issue pt-tag pt-large pt-intent-${ageLevel}`}>
      <a href={issue.url}>
        {age != null && <b>[{age}d]</b>} [{key}] {summary}
      </a>
    </span>
  );
}
