/* eslint-disable @typescript-eslint/no-namespace */
import { createAction } from 'redux-actions';
import { IProject, ITask } from "types/project";


enum Type {
    GET_PROJECTS = 'projects/getProjects',
    GET_PROJECTS_LOADING = 'projects/getProjectsLoading',
    GET_PROJECTS_SUCCESS = 'projects/getProjectsSuccess',
    GET_PROJECTS_FAILED = 'projects/getProjectsFailed',

    CLEAR_PROJECTS = 'projects/clearProjects',

    CREATE_PROJECT = 'projects/createProject',
    UPDATE_PROJECT = 'projects/updateProject',
    DELETE_PROJECT = 'projects/deleteProject',
}

const getProjects = createAction(Type.GET_PROJECTS);
const getProjectsLoading = createAction(Type.GET_PROJECTS_LOADING);
const getProjectsSuccess = createAction<{[key: string]: IProject}>(Type.GET_PROJECTS_SUCCESS);
const getProjectsFailed = createAction(Type.GET_PROJECTS_FAILED);

const createProject = createAction<IProject>(Type.CREATE_PROJECT);
const updateProject = createAction<IProject>(Type.UPDATE_PROJECT);
const deleteProject = createAction<IDeleteProject['payload']>(Type.DELETE_PROJECT);

const clearProjects = createAction(Type.CLEAR_PROJECTS);


export const ProjectsActions = {
    Type,
    getProjects,
    getProjectsLoading,
    getProjectsSuccess,
    getProjectsFailed,

    createProject,
    updateProject,
    deleteProject,

    clearProjects
};

export interface IGetProjectsLoading {
    type: Type.GET_PROJECTS;
}

export interface IGetProjectsFailed {
    type: Type.GET_PROJECTS_FAILED;
    payload: string;
    isLoading: boolean;
}

export interface IGetProjectsSuccess {
    type: Type.GET_PROJECTS_SUCCESS;
    payload: {[key: string]: IProject};
}

export interface ICreateProject {
    type: Type.CREATE_PROJECT;
    payload: IProject;
}

export interface IUpdateProject {
    type: Type.UPDATE_PROJECT;
    payload: IProject;
}

export interface IDeleteProject {
    type: Type.DELETE_PROJECT;
    payload: {
        id: IProject['id']
    };
}

export interface IClearProjects {
    type: Type.CLEAR_PROJECTS;

}


export type ProjectsActionsTypes = IGetProjectsLoading | IGetProjectsFailed | IGetProjectsSuccess | ICreateProject | IUpdateProject | IDeleteProject | IClearProjects;

export type ProjectsActions = Omit<typeof ProjectsActions, 'Type'>;


