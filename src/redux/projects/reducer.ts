import { IProject } from "types/project";
import { ProjectsActions, ProjectsActionsTypes } from "./actions";

export interface IProjectsReducer {
    projects: {
        ids: IProject['id'][],
        list: {
            [key: string]: IProject
        },
    };
    isLoading: boolean;
    error: string | null;

}

const initialState = {
    projects: {
        ids: [],
        list: {},
    },
    isLoading: false,
    error: null,
};

export const projectsReducer = (state = initialState, action: ProjectsActionsTypes): IProjectsReducer => {
    switch (action.type) {
        case ProjectsActions.Type.GET_PROJECTS :
            return {
                ...state,
                isLoading: true,
            };

        case ProjectsActions.Type.GET_PROJECTS_SUCCESS :
            return {
                ...state,
                isLoading: false,
                projects: {
                    ids: Object.keys(action.payload),
                    list: action.payload,
                },
            };

        case ProjectsActions.Type.GET_PROJECTS_FAILED :
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        case ProjectsActions.Type.CREATE_PROJECT :
            {
                const id = action.payload.id;
                const ids = [...state.projects.ids, id];
                const list: { [key: string]: IProject } = {...state.projects.list};
                list[id] = action.payload;

                return {
                    ...state,
                    projects: {
                        ids,
                        list
                    }
                };

            }

        case ProjectsActions.Type.UPDATE_PROJECT :
            {
                const projectId: IProject['id'] = action.payload.id;
                const list: { [key: string]: IProject } = {...state.projects.list};
                list[projectId] = action.payload;

                return {
                    ...state,
                    projects: {
                        ...state.projects,
                        list
                    }
                };
            }
        case ProjectsActions.Type.DELETE_PROJECT :
            {
                const ids = state.projects.ids.filter((id: IProject['id']) => id !== action.payload.id);
                const list: { [key: string]: IProject } = {...state.projects.list};
                delete list[action.payload.id];

                return {
                    ...state,
                    projects: {
                        ids,
                        list,
                    },

                };
            }

        case ProjectsActions.Type.CLEAR_PROJECTS:
            return initialState;

        default: return state;
    }
};