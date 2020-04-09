/* eslint-disable @typescript-eslint/no-namespace */
import { put, takeEvery, call } from 'redux-saga/effects';
import firebase from 'firebase';
import { ProjectsActions } from "../actions";
import { IProject } from "types/project";



function getProjectRequest(): {[key: string]: IProject} | {} {

    return firebase
                .database()
                .ref('projects')
                .once('value')
                .then(snapshot => snapshot && snapshot.val() ? snapshot.val() : {});

}

function* getProject() {
    yield put(ProjectsActions.getProjectsLoading());

    try {
        const projects = yield call(getProjectRequest);
        yield put(ProjectsActions.getProjectsSuccess(projects));

    } catch (err) {
        yield put(ProjectsActions.getProjects());
    }


}

export function* watchGetProjects() {
    yield takeEvery(ProjectsActions.Type.GET_PROJECTS, getProject);
}

export const watchersGetProjects = [watchGetProjects()];