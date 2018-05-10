import React from 'react';

import * as gerritChange from '../../constants/gerritChange';
import './GerritChange.css';

export default function GerritChange({
  change: { subject, age, insertions, deletions },
}) {
  let ageLevel = 'normal';
  if (age >= gerritChange.GERRIT_CHANGE_AGE_WARNING) {
    ageLevel = 'warning';
  }
  if (age >= gerritChange.GERRIT_CHANGE_AGE_DANGER) {
    ageLevel = 'danger';
  }
  return (
    <div className={`gerrit-change gerrit-change-${ageLevel} pt-ui-text-large`}>
      <span>
        <b>[{age}d]&nbsp;</b>
        {subject}
      </span>
    </div>
  );
}
