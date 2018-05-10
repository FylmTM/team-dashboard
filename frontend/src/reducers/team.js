const initialState = {
  loaded: false,
};

export default function team(state = initialState, action) {
  switch (action.type) {
    case 'team/load':
      return {
        loaded: true,
        data: action.data,
      };
    default:
      return state;
  }
}
