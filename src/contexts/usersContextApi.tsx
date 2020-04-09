import React from 'react';
import { FirebaseDBContext } from "./firebaseDatabaseContext";
import { IAssignedUser } from "types/user";

interface IGlobalProviderUsersContextApi {
    addUser: (user: IAssignedUser) => Promise<IAssignedUser>;
}

export const UsersContextApi = React.createContext<IGlobalProviderUsersContextApi | null>(null);

export class GlobalProviderUsersContextApi extends React.Component {

    static contextType = FirebaseDBContext;

    async addUser (user: IAssignedUser):  Promise<IAssignedUser> {
        const ref = this.context.ref(`/users/${user.id}`);

        return ref.set({
            id: user.id,
            email: user.email,
        });
    }


    render () {
        return (
            <UsersContextApi.Provider value={{
                addUser: this.addUser
            }}>
                { this.props.children }
            </UsersContextApi.Provider>
        );
    }
}