import React from 'react';
import { FirebaseDBContext } from "./firebaseDatabaseContext";
import { IProject } from "types/project";
import { generateUUID } from "utils/generateUUID";

interface IGlobalProviderProjectContextApi {
    createProject: (project: Omit<IProject, 'id'>) => Promise<IProject>;
    getProject: (id: IProject['id']) => Promise<any>;
    updateProject: (project: IProject) => Promise<IProject>;
    deleteProject: (id: IProject['id']) => Promise<void>;
}

export const ProjectContextApi = React.createContext<IGlobalProviderProjectContextApi | null>(null);

export class GlobalProviderProjectContextApi extends React.Component {

    static contextType = FirebaseDBContext;

    getProject = async (id: IProject['id']): Promise<any> => {
        const ref = this.context.ref(`/projects/${id}`);

        return ref.once('value');
    }

    createProject (project: Omit<IProject, 'id'>) : Promise<IProject> {
        const newProject: IProject = {
            ...project,
            id: generateUUID()
        };

        const ref = this.context.ref(`/projects/${newProject.id}`);

        return ref.set(project).then(() => project);
    }

    updateProject (project: IProject): Promise<IProject> {
        const ref = this.context.ref(`/projects/${project.id}`);

        return ref.set(project).then(() => project);

    }

    deleteProject (id: IProject['id']): Promise<void> {
        const ref = this.context.ref(`/projects/${id}`);

        return ref.remove();
    }


    render () {
        return (
            <ProjectContextApi.Provider value={{
                getProject: this.getProject,
                createProject: this.createProject,
                updateProject: this.updateProject,
                deleteProject: this.deleteProject
            }}>
                { this.props.children }
            </ProjectContextApi.Provider>
        );
    }
}