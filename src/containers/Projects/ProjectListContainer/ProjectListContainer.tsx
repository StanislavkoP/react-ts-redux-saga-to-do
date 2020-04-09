import React from 'react';
import { useTypedSelector } from "redux/rootReducer";
import { Empty } from "antd";
import { ProjectCardList } from "components/Projects/ProjectCardListWithControls/ProjectCardList";

export function ProjectListContainer() {
    const projectsIds = useTypedSelector(state => state.projectsReducer.projects.ids);

    if (!projectsIds.length) {
        return (
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description='No projects'
            />
        );
    }

    return (
        <ProjectCardList projectsIds={projectsIds} />
    );
}