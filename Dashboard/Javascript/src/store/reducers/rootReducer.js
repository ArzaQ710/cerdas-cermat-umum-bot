import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import { questionReducer } from "./questionReducer";

const rootReducer = combineReducers({
  question: questionReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
