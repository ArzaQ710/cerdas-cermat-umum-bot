const initState = {
  question: {
    deleted: false,
  },
};

export const questionReducer = (state = initState, action) => {
  switch (action.type) {
    case "QUESTION_DELETED":
      console.log(`Question with id: ${action.id} deleted`);
      console.log(state);
      return {
        ...state,
        deleted: action.id,
      };

    default:
      return state;
  }
};
