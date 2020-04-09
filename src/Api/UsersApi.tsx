import firebase from "firebase";
import { IAssignedUser } from "../types";

export class UsersApi {

    static async addUser (user: IAssignedUser):  Promise<IAssignedUser> {
        const ref = firebase.database().ref(`/users/${user.id}`);

        return ref.set({
            id: user.id,
            email: user.email,
        });
    }

}