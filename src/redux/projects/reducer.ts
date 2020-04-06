import { IProject } from "types/project";
import { ProjectsActions, ProjectsActionsTypes } from "./actions";

export interface IProjectsReducer {
    projects: Array<IProject>,
    isLoading: boolean,
    error: string | null,

}

const initialState = {
    projects: [],
    isLoading: false,
    error: null,
};

export const projectsReducer = (state = initialState, action: ProjectsActionsTypes): IProjectsReducer => {
    switch (action.type) {
        case ProjectsActions.Type["projects/getProjectsLoading"] :
            return {
                ...state,
                isLoading: true,
            };

        case ProjectsActions.Type["projects/getProjectsSuccess"] :
            return {
                ...state,
                isLoading: false,
                projects: action.payload,
            };

        case ProjectsActions.Type["projects/getProjectsFailed"] :
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        default: return state;
    }
};