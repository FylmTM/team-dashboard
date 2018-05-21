import team from './mock/team.json';
import jira from './mock/jira.json';
import jenkins from './mock/jenkins.json';
import gerrit from './mock/gerrit.json';

export default function fetchAndPollData(store) {
  store.dispatch({ type: 'team/load', data: team.data });
  store.dispatch({ type: 'jira/load', data: jira.data });
  store.dispatch({ type: 'jenkins/load', data: jenkins.data });
  store.dispatch({ type: 'gerrit/load', data: gerrit.data });
}
