import React from 'react';
import { List } from "antd";
import { IProject, ITask } from "types/project";
import { TaskCardContainer } from "containers/Project/Task/TaskCardContainer/TaskCardContainer";

interface ITaskList {
    ids: ITask['id'][];
    projectId: IProject['id'];
}

export function TaskList({
    ids,
    projectId
}: ITaskList) {
    return (
        <List
            className='task-list'
            itemLayout="vertical"
            dataSource={ids}
            renderItem={(id:ITask['id']) => <TaskCardContainer id={id} key={id} projectId={projectId} />}
        />

    );
}