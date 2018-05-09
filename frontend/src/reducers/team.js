import data from './mock-data/team.json';

const initialState = data.data;

export default function team(state = initialState, action) {
    switch (action.type) {
        case 'team/load':
            return action.data;
        default:
            return state;
    }
}
