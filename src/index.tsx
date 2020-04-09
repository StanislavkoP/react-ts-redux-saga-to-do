import React from 'react';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import firebase from "firebase/app";
import "firebase/auth";
import store from 'redux/store';
import { IUser } from "types/user";
import { IAuth } from "types/auth";
import { AuthActions } from "redux/auth/actions";
import { UserActions } from "redux/user/actions";
import { firebaseConfig } from "config/firebase";
import MainRouter from 'router';

import './index.scss';

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
