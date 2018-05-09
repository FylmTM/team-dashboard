import React from 'react';
import {connect} from 'react-redux'
import {jiraDataSelector} from '../../selectors';

import JiraBoardMember from './JiraBoardMember';
import './JiraBoard.css';

export function JiraBoard({board: {sprintName, members}}) {
    return (
        <div className="jira-board">
            <div className="grid-block">
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
                    {members.map(member =>
                        <JiraBoardMember key={member.name} member={member}/>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        board: jiraDataSelector(state)
    }
};

export default connect(mapStateToProps)(JiraBoard)
