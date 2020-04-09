/* eslint-disable @typescript-eslint/no-namespace */
import { createAction } from 'redux-actions';

enum Type {
    AUTH_SUCCESS = 'auth/authSuccess',
    LOG_OUT = 'auth/logOut',
}

const authSuccess = createAction(Type.AUTH_SUCCESS);
const logOut = createAction(Type.LOG_OUT);

export const AuthActions = {
    Type,

    authSuccess,
    logOut
};

export type AuthActions = Omit<typeof AuthActions, 'Type'>;