import React from 'react';
import { connect } from 'react-redux';
import { jiraDataSelector } from '../../selectors';

import JiraBoardMember from './JiraBoardMember';
import JiraIssueTag from './JiraIssueTag';
import './JiraBoard.css';

export function JiraBoard({ board: { sprintName, issues, members } }) {
  const createIssueTag = issue => (
    <JiraIssueTag key={issue.key} issue={issue} />
  );

  return (
    <div className="jira-board">
      <div className="grid-block">
        <h3>{sprintName}</h3>
        <table className="pt-html-table pt-html-table-bordered pt-html-table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Blocked</th>
              <th>In Progress</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <JiraBoardMember key={member.name} member={member} />
            ))}
          </tbody>
        </table>
      </div>
      <hr />
      <div className="grid-row jira-open-and-done">
        <div className="grid-unit">
          <h3>Open</h3>
          <div>{issues.open.map(createIssueTag)}</div>
        </div>
        <div className="grid-unit">
          <h3>Done</h3>
          {issues.done.map(createIssueTag)}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    board: jiraDataSelector(state),
  };
};

export default connect(mapStateToProps)(JiraBoard);
