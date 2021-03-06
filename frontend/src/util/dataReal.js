import { showError } from './toast';

const CONFIGURATION_POLL_INTERVAL = 5 * 1000;
const TEAM_POLL_INTERNVAL = 5 * 1000;
const GERRIT_POLL_INTERNVAL = 5 * 1000;
const JIRA_POLL_INTERNVAL = 5 * 1000;
const JENKINS_POLL_INTERVAL = 5 * 1000;

let teamName = '';

function updateTeamName() {
  teamName = window.location.hash.substring(
    window.location.hash.indexOf('#') + 1
  );

  if (!teamName) {
    showError('Team name is not specified. Add #<TeamName> to URL.');
  }
  console.log(`Team name: ${teamName}`);
}

function listenForHashChange(store) {
  window.addEventListener(
    'hashchange',
    () => {
      updateTeamName();
      unloadData(store);
      loadData(store);
    },
    false
  );
}

function unloadData(store) {
  store.dispatch({ type: 'team/unload' });
  store.dispatch({ type: 'jira/unload' });
  store.dispatch({ type: 'jenkins/unload' });
  store.dispatch({ type: 'gerrit/unload' });
}

function fetchData(store, url, actionType) {
  console.log(`Fetching data for '${url}`);

  return fetch(url)
    .then(response => response.json())
    .then(result => {
      if (result.success === true) {
        store.dispatch({ type: actionType, data: result.data });
      } else {
        console.error(`Error loading data for ${url}`, result);
        showError(
          `Error loading data for ${url}. Response: ${JSON.stringify(result)}`
        );
      }
    });
}

function loadConfiguration(store) {
  console.log('Load configuration data');
  store.dispatch({
    type: 'configuration/currentTeamName',
    data: { name: teamName },
  });
  fetch('/api/configuration')
    .then(response => response.json())
    .then(result => {
      store.dispatch({ type: 'configuration/load', data: result });
    });
}

function loadTeamData(store) {
  console.log('Load team data');
  if (teamName) {
    fetchData(store, `/api/team/${teamName}`, 'team/load');
  }
}

function loadJiraData(store) {
  console.log('Load JIRA data');
  if (teamName) {
    fetchData(store, `/api/team/${teamName}/jira`, 'jira/load');
  }
}

function loadJenkinsData(store) {
  console.log('Load Jenkins data');
  if (teamName) {
    fetchData(store, `/api/team/${teamName}/jenkins`, 'jenkins/load');
  }
}

function loadGerritData(store) {
  console.log('Load Gerrit data');
  if (teamName) {
    fetchData(store, `/api/team/${teamName}/gerrit`, 'gerrit/load');
  }
}

function loadData(store) {
  console.log('Loading data...');
  loadConfiguration(store);
  loadTeamData(store);
  loadJiraData(store);
  loadJenkinsData(store);
  loadGerritData(store);
}

function startPolling(store) {
  setInterval(() => {
    loadConfiguration(store);
  }, CONFIGURATION_POLL_INTERVAL);

  setInterval(() => {
    loadTeamData(store);
  }, TEAM_POLL_INTERNVAL);

  setInterval(() => {
    loadJiraData(store);
  }, JIRA_POLL_INTERNVAL);

  setInterval(() => {
    loadJenkinsData(store);
  }, JENKINS_POLL_INTERVAL);

  setInterval(() => {
    loadGerritData(store);
  }, GERRIT_POLL_INTERNVAL);
}

export default function fetchAndPollData(store) {
  updateTeamName();
  loadData(store);
  startPolling(store);
  listenForHashChange(store);
}
