import React, {Component} from 'react';

import Jobs from './jenkins/JenkinsJobs';

import './App.css';

class App extends Component {
    render() {
        return (
            <div className="grid-row">
                <div className="grid-column">
                    <div className="grid-unit padding-10">
                        <h2 key="jenkins-title">JIRA</h2>
                    </div>
                </div>
                <div className="grid-column">
                    <div className="grid-unit padding-10">
                        <div className="grid-block">
                            <h2 key="jenkins-title">Jenkins</h2>
                            <Jobs/>
                        </div>
                        <div className="grid-block">
                            <h2 key="jenkins-title">Gerrit</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
