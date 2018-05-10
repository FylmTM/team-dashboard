const initialState = {
  loaded: false,
};

export default function jenkins(state = initialState, action) {
  switch (action.type) {
    case 'jenkins/load':
      return {
        loaded: true,
        data: action.data,
      };

    case 'jenkins/unload':
      return {
        loaded: false,
      };
    default:
      return state;
  }
}
