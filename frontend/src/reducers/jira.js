const initialState = {
  loaded: false,
};

export default function jira(state = initialState, action) {
  switch (action.type) {
    case 'jira/load':
      return {
        loaded: true,
        data: action.data,
      };
    case 'jira/unload':
      return {
        loaded: false,
      };
    default:
      return state;
  }
}
