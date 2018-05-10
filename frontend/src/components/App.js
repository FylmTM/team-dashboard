import React, { Component } from 'react';

import JenkinsJobs from './jenkins/JenkinsJobsLoaded';
import JiraBoard from './jira/JiraBoardLoaded';

import './App.css';

class App extends Component {
  render() {
    return (
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
              <p>
                <b>WIP</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
