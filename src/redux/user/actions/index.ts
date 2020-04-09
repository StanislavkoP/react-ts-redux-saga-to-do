/* eslint-disable @typescript-eslint/no-namespace */
import { createAction } from 'redux-actions';
import { IUser } from 'types/user';

enum Type {
    SET_USER = 'user/setUser',
    CLEAR_USER = 'user/clearUser',
}

const setUser = createAction<IUser>(Type.SET_USER);
const clearUser = createAction(Type.CLEAR_USER);

export const UserActions = {
    Type,

    setUser,
    clearUser
};

export type UserActions = Omit<typeof UserActions, 'Type'>;