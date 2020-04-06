import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import firebase from "firebase/app";
import "firebase/auth";
import store from 'redux/store';
import MainRouter from 'router';

import './index.scss';
import {AuthActions} from "./redux/auth/actions";
import {IAuth, IUser} from "./types";
import {UserActions} from "./redux/user/actions";


const firebaseConfig = {
    apiKey: "AIzaSyCqqYzOok93vKGl5PqWnv-JqLXSNYHszvg",
    authDomain: "react-ts-to-do.firebaseapp.com",
    databaseURL: "https://react-ts-to-do.firebaseio.com",
    projectId: "react-ts-to-do",
    storageBucket: "react-ts-to-do.appspot.com",
    messagingSenderId: "168333316025",
    appId: "1:168333316025:web:bf4b4a2b6eaa4882f63068"
};
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(async user => {
   if (user) {
       const userData: IUser= {
           email: user.email
       };
       const authData: IAuth = {
           refreshToken: user.refreshToken
       };

       store.dispatch(AuthActions.authSuccess(authData));
       store.dispatch(UserActions.setUser(userData));
   }
});

const app = (
    <Provider store={store}>
        <MainRouter />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
