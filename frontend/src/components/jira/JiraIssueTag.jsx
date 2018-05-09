import React from 'react';

export default function IssueTag({issue}) {
    const {key, summary} = issue;

    return (
        <span className="jira-issue pt-tag pt-large">
            <b>[2d]</b> [{key}] {summary}
        </span>
    );
}
