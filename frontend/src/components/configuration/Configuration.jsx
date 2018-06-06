import React from 'react';
import { connect } from 'react-redux';
import { configurationDataSelector } from '../../selectors';

function Configuration({ configuration }) {
  const { currentTeamName, teams } = configuration;
  console.log(configuration);
  return (
    <div className="pt-button-group">
      {teams.map(team => {
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
  );
}

const mapStateToProps = state => {
  return {
    configuration: configurationDataSelector(state),
  };
};

export default connect(mapStateToProps)(Configuration);
