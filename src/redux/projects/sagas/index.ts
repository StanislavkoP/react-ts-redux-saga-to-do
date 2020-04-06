/* eslint-disable @typescript-eslint/no-namespace */
import { put, takeEvery, call } from 'redux-saga/effects'
import firebase from 'firebase';
import { ProjectsActions } from "../actions";
import {IProject} from "../../../types/project";



function getProjectRequest() {

    return firebase
                .firestore()
                .collection('projects')
                .get()
                .then(data => {

                const projects = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));

                return projects;
            });

}

function* getProject() {
    yield put(ProjectsActions.getProjectsLoading());
    const projects = yield call(getProjectRequest);
    yield put(ProjectsActions.getProjectsSuccess(projects))


}

export function* watchGetProjects() {
    yield takeEvery(ProjectsActions.Type["projects/getProjects"], getProject)
}

export const watchersGetProjects = [watchGetProjects()];