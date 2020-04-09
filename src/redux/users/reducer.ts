import { UsersActions, UsersActionsTypes } from "./actions";
import { IAssignedUser } from "types/user";

export interface IUsersReducer {
    users: {
        ids: IAssignedUser['id'][],
        list: {
            [key: string]: IAssignedUser
        },
    };
    isLoading: boolean;
    error: string | null;

}

const initialState = {
    users: {
        ids: [],
        list: {},
    },
    isLoading: false,
    error: null,
};

export const usersReducer = (state = initialState, action: UsersActionsTypes): IUsersReducer => {
    switch (action.type) {
        case UsersActions.Type.GET_USERS :
            return {
                ...state,
                isLoading: true,
            };

        case UsersActions.Type.GET_USERS_SUCCESS :
            return {
                ...state,
                isLoading: false,
                users: {
                    ids: Object.keys(action.payload),
                    list: action.payload,
                },
            };

        case UsersActions.Type.GET_USERS_FAILED :
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        case UsersActions.Type.CLEAR_USERS :
            return initialState;


        default: return state;
    }
};