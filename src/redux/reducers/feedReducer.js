const feedReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_YOUE_FEED':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default feedReducer;