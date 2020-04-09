import { IProject, ITask } from "../types/project";
import { generateUUID } from "../utils/generateUUID";
import firebase from "firebase";

export class TaskApi {

    static createTask(projectId: IProject['id'], task: Omit<ITask, 'id'>): Promise<ITask> {
        const newTask: ITask = {
            ...task,
            id: generateUUID()
        };

        const ref = firebase.database().ref(`/projects/${projectId}/tasks/${newTask.id}`);

        return ref.set(newTask).then(() => newTask);
    }


    static updateTask(projectId: IProject['id'], task: ITask): Promise<ITask> {
        const ref = firebase.database().ref(`/projects/${projectId}/tasks/${task.id}`);

        return ref.set(task).then(() => task);
    }

    static deleteTask(projectId: IProject['id'], id: IProject['id']): Promise<void> {
        const ref = firebase.database().ref(`/projects/${projectId}/tasks/${id}`);

        return ref.remove();
    }

}