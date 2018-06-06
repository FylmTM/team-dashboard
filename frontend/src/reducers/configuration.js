const initialState = {
  loaded: false,
};

export default function configuration(state = initialState, action) {
  switch (action.type) {
    case 'configuration/currentTeamName':
      return {
        ...state,
        currentTeamName: action.data.name,
      };
    case 'configuration/load':
      return {
        ...state,
        loaded: true,
        configuration: action.data,
      };
    case 'configuration/unload':
      return {
        loaded: false,
      };
    default:
      return state;
  }
}
