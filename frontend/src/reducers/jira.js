import data from './mock-data/jira.json';

const initialState = data.data;

export default function jira(state = initialState, action) {
    switch (action.type) {
        case 'jira/load':
            return action.data;
        default:
            return state;
    }
}
