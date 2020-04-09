import React from 'react';
import { useTypedSelector } from "redux/rootReducer";
import { ProjectCardList } from "components/Projects/ProjectCardListWithControls/ProjectCardList";

export function ProjectListContainer() {
    const projectsIds = useTypedSelector(state => state.projectsReducer.projects.ids);

    return (
        <>

            <ProjectCardList projectsIds={projectsIds} />
        </>
    );
}