export const addQuestion = (payload) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();

    firebase
      .firestore()
      .collection("questions")
      .add(payload)
      .then((docRef) => {
        console.log("Question added with ID: ", docRef.id);
      })
      .catch((err) => console.log(err.code));
  };
};

export const editQuestion = (payload, id) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();

    firebase
      .firestore()
      .collection("questions")
      .doc(id)
      .update(payload)
      .then(() => console.log("QUestion edited"))
      .catch((err) => console.log(err.code));
  };
};

export const deleteQuestion = (id) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();

    firebase
      .firestore()
      .collection("questions")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: "QUESTION_DELETED", id });
      })
      .catch((err) => console.log(err.code));
  };
};
