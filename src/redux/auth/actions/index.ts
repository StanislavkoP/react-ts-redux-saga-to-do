/* eslint-disable @typescript-eslint/no-namespace */
import { createAction } from 'redux-actions';
import { IUser } from 'types';

enum Type {
    AUTH_SUCCESS = 'AUTH_SUCCESS',
}

const authSuccess = createAction(Type.AUTH_SUCCESS, );

export const AuthActions = {
    Type,

    authSuccess
};

export type AuthActions = Omit<typeof AuthActions, 'Type'>;