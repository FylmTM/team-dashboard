import React, { Component } from 'react';

import Configuration from './configuration/ConfigurationLoaded';
import JenkinsJobs from './jenkins/JenkinsJobsLoaded';
import JiraBoard from './jira/JiraBoardLoaded';
import GerritChanges from './gerrit/GerritChangesLoaded';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div className="grid-row">
          <Configuration />
        </div>
        <div className="grid-row">
          <div className="grid-column">
            <div className="grid-unit padding-10">
              <h2 key="jenkins-title">JIRA</h2>
              <JiraBoard />
            </div>
          </div>
          <div className="grid-column">
            <div className="grid-unit padding-10">
              <div className="grid-block">
                <h2 key="jenkins-title">Jenkins</h2>
                <JenkinsJobs />
              </div>
              <div className="grid-block">
                <h2 key="jenkins-title">Gerrit</h2>
                <GerritChanges />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
