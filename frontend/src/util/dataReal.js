import { showError } from './toast';

const TEAM_POLL_INTERNVAL = 5 * 1000;
const GERRIT_POLL_INTERNVAL = 5 * 1000;
const JIRA_POLL_INTERNVAL = 5 * 1000;
const JENKINS_POLL_INTERVAL = 5 * 1000;

let teamName = '';

function updateTeamName() {
  teamName = window.location.hash.substring(
    window.location.hash.indexOf('#') + 1
  );

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

  fetch(url)
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

function loadTeamData(store) {
  console.log('Load team data');
  fetchData(store, `/api/team/${teamName}`, 'team/load');
}

function loadJiraData(store) {
  console.log('Load JIRA data');
  fetchData(store, `/api/team/${teamName}/jira`, 'jira/load');
}

function loadJenkinsData(store) {
  console.log('Load Jenkins data');
  fetchData(store, `/api/team/${teamName}/jenkins`, 'jenkins/load');
}

function loadGerritData(store) {
  console.log('Load Gerrit data');
  fetchData(store, `/api/team/${teamName}/gerrit`, 'gerrit/load');
}

function loadData(store) {
  console.log('Loading data...');
  loadTeamData(store);
  loadJiraData(store);
  loadJenkinsData(store);
  loadGerritData(store);
}

function startPolling(store) {
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
