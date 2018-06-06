import { createSelector } from 'reselect';

const configuration = state => state.configuration.configuration;
const currentTeamName = state => state.configuration.currentTeamName;

export const configurationDataSelector = createSelector(
  configuration,
  currentTeamName,
  (configuration, currentTeamName) => {
    return {
      currentTeamName,
      teams: configuration.teams.map(team => team.name),
    };
  }
);
