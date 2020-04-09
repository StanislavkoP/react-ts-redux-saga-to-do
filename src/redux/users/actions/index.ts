/* eslint-disable @typescript-eslint/no-namespace */
import { createAction } from 'redux-actions';
import { IAssignedUser } from "types/user";


enum Type {
    GET_USERS = 'users/getUsers',
    GET_USERS_LOADING = 'users/getUsersLoading',
    GET_USERS_SUCCESS = 'users/getUsersSuccess',
    GET_USERS_FAILED = 'users/getUsersFailed',

    CLEAR_USERS = 'projects/clearUsers',
}

const getUsers = createAction(Type.GET_USERS);
const getUsersLoading = createAction(Type.GET_USERS_LOADING);
const getUsersSuccess = createAction<{ [key: string]: IAssignedUser }>(Type.GET_USERS_SUCCESS);
const getUsersFailed = createAction(Type.GET_USERS_FAILED);
const clearUsers = createAction(Type.CLEAR_USERS);

export const UsersActions = {
    Type,

    getUsers,
    getUsersLoading,
    getUsersSuccess,
    getUsersFailed,
    clearUsers,
};

export interface IGetUsersLoading {
    type: Type.GET_USERS;
}

export interface IGetUsersFailed {
    type: Type.GET_USERS_FAILED;
    payload: string;
    isLoading: boolean;
}

export interface IGetUsersSuccess {
    type: Type.GET_USERS_SUCCESS;
    payload: { [key: string]: IAssignedUser };
}

export interface IClearUsers {
    type: Type.CLEAR_USERS;
}


export type UsersActionsTypes = IGetUsersLoading | IGetUsersFailed | IGetUsersSuccess | IClearUsers;

export type UsersActions = Omit<typeof UsersActions, 'Type'>;


