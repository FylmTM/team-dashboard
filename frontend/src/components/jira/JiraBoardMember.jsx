import React from 'react';

import JiraIssueTag from './JiraIssueTag';
import './JiraBoardMember.css';

export default function JiraBoardMember({ member }) {
  const {
    name,
    issues: { blocked, inProgress, review },
  } = member;

  const createIssueTag = issue => (
    <JiraIssueTag key={issue.key} issue={issue} />
  );
  const hasIssuesInProgress = inProgress.length !== 0 || review.length !== 0;

  return (
    <tr
      className={`jira-board-member ${
        hasIssuesInProgress
          ? 'jira-board-member-good'
          : 'jira-board-member-lazy'
      }`}
    >
      <td>{name}</td>
      <td>{blocked.map(createIssueTag)}</td>
      <td>{inProgress.map(createIssueTag)}</td>
      <td>{review.map(createIssueTag)}</td>
    </tr>
  );
}
