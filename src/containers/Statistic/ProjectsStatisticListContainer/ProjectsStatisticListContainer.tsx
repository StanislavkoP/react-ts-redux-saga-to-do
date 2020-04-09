import React from 'react';
import { ProjectStatisticCardList } from "components/Statistic/ProjectStatisticCardList/ProjectStatisticCardList";
import { useTypedSelector } from "redux/rootReducer";
import { Empty } from "antd";

export function ProjectsStatisticListContainer() {
    const projects = useTypedSelector(state => state.projectsReducer.projects);

    if (!projects.ids.length) {
        return (
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description='No projects'
            />
        );
    }

    return (
        <ProjectStatisticCardList ids={projects.ids} list={projects.list}/>
    );
}