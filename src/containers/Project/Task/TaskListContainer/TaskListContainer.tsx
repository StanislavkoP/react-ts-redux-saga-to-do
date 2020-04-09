import React, { useMemo } from 'react';
import { useTypedSelector } from "redux/rootReducer";
import { Empty } from "antd";
import { TaskList } from "components/Project/TaskList/TaskList";

interface ITaskListContainer {
    projectId: string;
}

export function TaskListContainer({
    projectId,
}: ITaskListContainer) {
    const projects = useTypedSelector(state => state.projectsReducer.projects);
    const currentProject = useMemo(() => projects.list[projectId], [projects]);
    const tasksIds = useMemo(() => currentProject && currentProject.tasks ? Object.keys(currentProject.tasks) : [], [currentProject]);


    if (!tasksIds.length) {
        return (
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description='No tasks'
            />
        );
    }

    return ( <TaskList ids={tasksIds} projectId={projectId}/> );
}