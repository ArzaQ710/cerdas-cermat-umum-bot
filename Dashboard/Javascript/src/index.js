import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers/rootReducer";
import { createStore, compose, applyMiddleware } from "redux";
import { reduxFirestore, createFirestoreInstance } from "redux-firestore";
import thunk from "redux-thunk";
import { getFirebase, ReactReduxFirebaseProvider } from "react-redux-firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZB66DyuNrxb4EXjJV2v3iMYCKS6FSacw",
  authDomain: "telegrambot-4b360.firebaseapp.com",
  databaseURL: "https://telegrambot-4b360.firebaseio.com",
  projectId: "telegrambot-4b360",
  storageBucket: "telegrambot-4b360.appspot.com",
  messagingSenderId: "1015857360214",
  appId: "1:1015857360214:web:18704b765a8c33c6ae3af7",
  measurementId: "G-PDFSQ3KWX4",
};

const rrfConfig = {
  userProfile: "users",
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const createStoreWithFirebase = compose(reduxFirestore(firebase))(createStore);

const store = createStoreWithFirebase(
  rootReducer,
  compose(applyMiddleware(thunk.withExtraArgument(getFirebase)))
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
