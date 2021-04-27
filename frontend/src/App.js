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
  apiKey: "AIzaSyCsAIDnmu3RMRs9ImHIjs-nUKTuSYKuVyE",
  authDomain: "mycrytpolink.firebaseapp.com",
  databaseURL: "https://mycrytpolink-default-rtdb.firebaseio.com",
  projectId: "mycrytpolink",
  storageBucket: "mycrytpolink.appspot.com",
  messagingSenderId: "760949177075",
  appId: "1:760949177075:web:8f336d97ace26c78845586",
  measurementId: "G-SJFPDKN8N1"
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
