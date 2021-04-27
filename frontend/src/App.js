import { Backdrop, CircularProgress } from "@material-ui/core";
import 'bootstrap/dist/css/bootstrap.css';
import firebase from 'firebase';
import React, { useEffect, useState } from "react";
import { MarkdownProvider } from 'react-markdown-tree';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import Main from "./component/Main";
import rootReducer from './redux/reducers';

var firebaseConfig = {
  apiKey: "****",
  authDomain: "****",
  databaseURL: "****",
  projectId: "****",
  storageBucket: "****",
  messagingSenderId: "****",
  appId: "****",
  measurementId: "****"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}


const store = createStore(rootReducer, applyMiddleware(thunk))

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [user, setUse] = useState(null)


  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      setUse(user)
      setLoaded(true)
    });
  }, [])

  if (!loaded) {
    return (
      <div className="background-grad" style={{height: '100vh'}}>

        <Backdrop style={{
          zIndex: 999999,
          color: '#fff',
        }}
          open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>

    )
  }

  return (
    <Provider store={store}>
      <MarkdownProvider >
        <Main />
      </MarkdownProvider>
    </Provider>
  );
}
