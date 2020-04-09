import { IProject } from "../types/project";
import { generateUUID } from "../utils/generateUUID";
import firebase from "firebase";

export class ProjectApi {

    static async getProject (id: IProject['id']): Promise<any> {
        const ref = firebase.database().ref(`/projects/${id}`);

        return ref.once('value');
    }

    static createProject (project: Omit<IProject, 'id'>): Promise<IProject> {
        const newProject: IProject = {
            ...project,
            id: generateUUID()
        };

        const ref = firebase.database().ref(`/projects/${newProject.id}`);

        return ref.set(newProject).then(() => newProject);
    }

    static updateProject (project: IProject): Promise<IProject> {
        const ref = firebase.database().ref(`/projects/${project.id}`);

        return ref.set(project).then(() => project);

    }

    static deleteProject (id: IProject['id']): Promise<void> {
        const ref = firebase.database().ref(`/projects/${id}`);

        return ref.remove();
    }

}