import {combineReducers} from 'redux';

import team from './team';
import jira from './jira';
import gerrit from './gerrit';
import jenkins from './jenkins';

const appReducer = combineReducers({
    team,
    jira,
    gerrit,
    jenkins
});

export default (state, action) => appReducer(state, action);
