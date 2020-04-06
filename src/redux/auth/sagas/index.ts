import { push } from 'react-router-redux';
import { put, takeEvery } from 'redux-saga/effects'
import {AuthActions} from "../actions";

function* changeRoute() {
    yield put(push('/projects'))
}

export function* watchUserAuthed() {
    yield takeEvery(AuthActions.Type.AUTH_SUCCESS, changeRoute)
}

export const watchersAuthSagas = [watchUserAuthed()];