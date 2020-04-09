/* eslint-disable @typescript-eslint/no-namespace */
import { put, takeEvery, call } from 'redux-saga/effects';
import firebase from 'firebase';
import { UsersActions } from "../actions";
import { IAssignedUser } from "types";
import { AuthActions } from "../../auth/actions";



function getUsersRequest(): { [key: string]: IAssignedUser } | {} {
    return firebase
                .database()
                .ref('/users')
                .once('value')
                .then(snapshot => snapshot && snapshot.val() ? snapshot.val() : {});

}

function* getUsers() {
    yield put(UsersActions.getUsers());

    try {
        const users = yield call(getUsersRequest);

        yield put(UsersActions.getUsersSuccess(users));

    } catch (error) {
        yield put(UsersActions.getUsersFailed());
    }
}

export function* watchGetUsers() {
    yield takeEvery(AuthActions.Type.AUTH_SUCCESS, getUsers);
    yield takeEvery(UsersActions.Type.GET_USERS_FAILED, getUsers);
}

export const watchersUsers = [watchGetUsers()];