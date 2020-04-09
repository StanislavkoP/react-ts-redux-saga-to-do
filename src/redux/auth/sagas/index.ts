import { push } from 'react-router-redux';
import { put, takeEvery } from 'redux-saga/effects';
import { Routes } from "constants/routes";
import { AuthActions } from "../actions";
import { ProjectsActions } from "../../projects/actions";
import { UsersActions } from "../../users/actions";
import { UserActions } from "../../user/actions";

function* changeRoute(route: string) {
    yield put(push(route));
}

function* authSuccess() {
    yield changeRoute(Routes.PROJECTS);
    yield put(ProjectsActions.getProjects());
    yield put(UsersActions.getUsers());
}

function* logOut() {
    yield put(UserActions.clearUser());
    yield put(UsersActions.clearUsers());
    yield put(ProjectsActions.clearProjects());
}

export function* watchUserAuthed() {
    yield takeEvery(AuthActions.Type.AUTH_SUCCESS, authSuccess);
    yield takeEvery(AuthActions.Type.LOG_OUT, logOut);
}

export const watchersAuthSagas = [watchUserAuthed()];