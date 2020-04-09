import React from 'react';
import { FirebaseDBContext } from "./firebaseDatabaseContext";
import { generateUUID } from "utils/generateUUID";
import { IProject, ITask } from "types/project";

interface IGlobalProviderTaskContextApi {
    createTask: (projectId: IProject['id'], task: Omit<ITask, 'id'>) => Promise<ITask>;
    updateTask: (projectId: IProject['id'], task: ITask) => Promise<ITask>;
    deleteTask: (projectId: IProject['id'], id: IProject['id']) => Promise<void>;
}

export const TaskContextApi = React.createContext<IGlobalProviderTaskContextApi | null>(null);

export class GlobalProviderTaskContextApi extends React.Component {

    static contextType = FirebaseDBContext;

    createTask(projectId: IProject['id'], task: Omit<ITask, 'id'>): Promise<ITask> {
        const newTask: ITask = {
            ...task,
            id: generateUUID()
        };

        const ref = this.context.ref(`/projects/${projectId}/tasks/${newTask.id}`);

        return ref.set(newTask).then(() => newTask);
    }


    updateTask(projectId: IProject['id'], task: ITask): Promise<ITask> {
        const ref = this.context.ref(`/projects/${projectId}/tasks/${task.id}`);

        return ref.set(task).then(() => task);
    }

    deleteTask(projectId: IProject['id'], id: IProject['id']): Promise<void> {
        const ref = this.context.ref(`/projects/${projectId}/tasks/${id}`);

        return ref.remove();
    }


    render () {
        return (
            <TaskContextApi.Provider value={{
                createTask: this.createTask,
                updateTask: this.updateTask,
                deleteTask: this.deleteTask,
            }}>
                { this.props.children }
            </TaskContextApi.Provider>
        );
    }
}