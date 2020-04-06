export interface ITask {
    text: string;
    assigned: number;
}

export interface IProject {
    id: string;
    title: string;
    description: string;
    tasks: Array<ITask>;
}