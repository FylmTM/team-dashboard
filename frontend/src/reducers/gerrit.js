const initialState = {
  loaded: false,
};

export default function gerrit(state = initialState, action) {
  switch (action.type) {
    case 'gerrit/load':
      return {
        loaded: true,
        data: action.data,
      };
    case 'gerrit/unload':
      return {
        loaded: false,
      };
    default:
      return state;
  }
}
