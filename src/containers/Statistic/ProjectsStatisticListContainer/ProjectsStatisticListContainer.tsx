import React from 'react';
import { ProjectStatisticCardList } from "components/Statistic/ProjectStatisticCardList/ProjectStatisticCardList";
import { useTypedSelector } from "redux/rootReducer";

export function ProjectsStatisticListContainer() {
    const projects = useTypedSelector(state => state.projectsReducer.projects);


    return (
        <ProjectStatisticCardList ids={projects.ids} list={projects.list}/>
    );
}