import firebase from "firebase";

export class AuthApi {

    static logIn(email: string, password: string): Promise<firebase.auth.UserCredential> {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    static logOut (): Promise<void> {
        return firebase.auth().signOut();
    }

    static registration (email: string, password: string): Promise<firebase.auth.UserCredential> {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    static resetPassword (email: string): Promise<void> {
        return firebase.auth().sendPasswordResetEmail(email);
    }

}