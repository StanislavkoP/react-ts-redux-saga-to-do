import { IAssignedUser } from "./user";

export interface IProject {
    id: string;
    title: string;
    description: string;
    tasksCount: number;
    completedCount: number;
    tasks: {
        [key: string]: ITask
    };
}

export interface IProjectForm {
    title: IProject['title'];
    description: IProject['description'];
}


export interface ITask {
    id: string;
    description: string;
    assigned?: IAssignedUser | null;
    completed: boolean;
}

export interface ITaskForm {
    description: ITask['description'];
    assigned: IAssignedUser['id'] | null;
    completed: ITask['completed'];
}