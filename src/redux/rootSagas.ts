import { all } from 'redux-saga/effects';
import { watchersAuthSagas } from "./auth/sagas";
import { watchersGetProjects } from "./projects/sagas";

export default function* rootSaga() {
    yield all([
        ...watchersAuthSagas,
        ...watchersGetProjects,
    ]);
}