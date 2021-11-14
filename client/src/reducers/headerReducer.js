const CHANGE_HEADER_TEXT = 'CHANGE_HEADER_TEXT';

let initialState = {
  headerText: 'TODO',
};

export const headerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_HEADER_TEXT:
      return {...state, headerText: action?.payload};
    default:
      return state;
  }
};

export const changeHeaderText = (payload) => ({type: CHANGE_HEADER_TEXT, payload})
