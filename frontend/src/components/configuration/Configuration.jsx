import React from 'react';
import { Dialog } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { configurationDataSelector } from '../../selectors';

class DashboardConfiguration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  toggleDialog() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <span>
        <button
          className="pt-button pt-icon-settings"
          onClick={() => this.toggleDialog()}
        >
          Dashboard Configuration
        </button>
        <Dialog
          icon="inbox"
          isOpen={this.state.isOpen}
          onClose={() => this.toggleDialog()}
          title="Dashboard Configuration"
          style={{ width: '90vw' }}
        >
          <div className="pt-dialog-body">
            <pre>
              <code>
                {JSON.stringify(this.props.teamConfigurations, null, 2)}
              </code>
            </pre>
          </div>
        </Dialog>
      </span>
    );
  }
}

function Configuration({ configuration }) {
  const { currentTeamName, teamNames, teamConfigurations } = configuration;
  console.log(configuration);
  return (
    <div>
      <div className="pt-button-group">
        {teamNames.map(team => {
          return (
            <a
              key={team}
              href={`#${team}`}
              role="button"
              className={`pt-button ${
                team === currentTeamName
                  ? 'pt-intent-primary pt-active'
                  : 'pt-minimal'
              }`}
            >
              {team}
            </a>
          );
        })}
      </div>
      <DashboardConfiguration teamConfigurations={teamConfigurations} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    configuration: configurationDataSelector(state),
  };
};

export default connect(mapStateToProps)(Configuration);
