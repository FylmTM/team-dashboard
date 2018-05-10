import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from '@blueprintjs/core';

import GerritChanges from './GerritChanges';

export function GerritChangesLoaded({ isLoaded }) {
  if (!isLoaded) {
    return (
      <div className="center">
        <Spinner />
      </div>
    );
  }

  return <GerritChanges />;
}

const mapStateToProps = state => {
  return {
    isLoaded: state.gerrit.loaded,
  };
};

export default connect(mapStateToProps)(GerritChangesLoaded);
