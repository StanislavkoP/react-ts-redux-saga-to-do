import React from "react";
import firebase from 'firebase/app';

interface IGlobalProviderAuthContextApi {
    logIn: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
    logOut: () => Promise<void>;
    registration: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
    resetPassword: (email: string) => Promise<void>;
}

export const AuthContextApi = React.createContext<IGlobalProviderAuthContextApi | null>(null);

export class GlobalProviderAuthContextApi extends React.Component {

    logIn(email: string, password: string): Promise<firebase.auth.UserCredential> {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    logOut (): Promise<void> {
        return firebase.auth().signOut();
    }

    registration (email: string, password: string): Promise<firebase.auth.UserCredential> {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    resetPassword (email: string): Promise<void> {
        return firebase.auth().sendPasswordResetEmail(email);
    }

    render () {
        return (
            <AuthContextApi.Provider value={{
                logIn: this.logIn,
                logOut: this.logOut,
                registration: this.registration,
                resetPassword: this.resetPassword,
            }}>
                { this.props.children }
            </AuthContextApi.Provider>
        );
    }

}
