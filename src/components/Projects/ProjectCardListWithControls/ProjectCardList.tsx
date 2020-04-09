import React from 'react';
import { Row } from "antd";
import { ProjectCardContainer } from "containers/Projects/ProjectCardContainer/ProjectCardContainer";
import { IProject } from "types/project";

interface IProjectCardWithControls {
    projectsIds: IProject['id'][];
}

export function ProjectCardList({
    projectsIds
}: IProjectCardWithControls) {
    return (
        <Row gutter={[16, 16]}>
            {
                projectsIds.map((id) => (
                    <ProjectCardContainer id={id} key={id} />
                ))
            }
        </Row>

    );
}