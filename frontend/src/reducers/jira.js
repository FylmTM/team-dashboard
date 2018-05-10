const initialState = {
  loaded: false
};

export default function jira(state = initialState, action) {
    switch (action.type) {
        case 'jira/load':
          return {
            loaded: true,
            data: action.data
          };
        default:
            return state;
    }
}
