import data from './mock-data/gerrit';

const initialState = data;

export default function gerrit(state = initialState, action) {
    switch (action.type) {
        case 'gerrit/load':
            return action.data;
        default:
            return state;
    }
}
