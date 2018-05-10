import React from 'react';
import { connect } from 'react-redux';
import { gerritDataSelector } from '../../selectors';

import GerritChange from './GerritChange';
import './GerritChanges.css';

export function GerritChanges({ changes }) {
  console.log(changes);
  return (
    <div className="gerrit-changes">
      {changes.map(change => <GerritChange key={change.id} change={change} />)}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    changes: gerritDataSelector(state),
  };
};

export default connect(mapStateToProps)(GerritChanges);
