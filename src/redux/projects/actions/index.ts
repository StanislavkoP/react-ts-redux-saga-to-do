/* eslint-disable @typescript-eslint/no-namespace */
import { createAction } from 'redux-actions';
import { IProject } from "types/project";


enum Type {
    'projects/getProjects' = 'projects/getProjects',
    'projects/getProjectsLoading' = 'projects/getProjectsLoading',
    'projects/getProjectsSuccess' = 'projects/getProjectsSuccess',
    'projects/getProjectsFailed' = 'projects/getProjectsFailed',
}

const getProjects = createAction(Type["projects/getProjects"]);
const getProjectsLoading = createAction(Type["projects/getProjectsLoading"]);
const getProjectsSuccess = createAction<Array<IProject>>(Type["projects/getProjectsSuccess"]);
const getProjectsFailed = createAction(Type["projects/getProjectsFailed"]);

export const ProjectsActions = {
    Type,
    getProjects,
    getProjectsLoading,
    getProjectsSuccess,
    getProjectsFailed,
};

export interface IGetProjectsLoading {
    type: "projects/getProjectsLoading";
}

export interface IGetProjectsFailed {
    type: "projects/getProjectsFailed";
    payload: string;
    isLoading: boolean;
}

export interface IGetProjectsSuccess {
    type: "projects/getProjectsSuccess";
    payload: Array<IProject>;
    isLoading: boolean;
}

export type ProjectsActionsTypes = IGetProjectsLoading | IGetProjectsFailed | IGetProjectsSuccess;

export type ProjectsActions = Omit<typeof ProjectsActions, 'Type'>;


