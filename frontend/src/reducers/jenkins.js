import data from './mock-data/jenkins';

const initialState = data;

export default function jenkins(state = initialState, action) {
    switch (action.type) {
        case 'jenkins/load':
            return action.data;
        default:
            return state;
    }
}
