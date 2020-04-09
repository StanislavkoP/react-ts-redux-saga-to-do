import React from 'react';
import { Col, Row } from "antd";
import { IProject } from "types/project";
import { ProjectStatisticCard } from "./ProjectStatisticCard/ProjectStatisticCard";

interface IProjectStatisticCardList {
    ids: IProject['id'][];
    list: {
        [key: string]: IProject
    };
}

export function ProjectStatisticCardList({
    ids,
    list
}:IProjectStatisticCardList ) {
    return (
        <Row gutter={[16, 16]}>
            {
                ids.map((id) => (
                    <Col xs={24} sm={12} lg={8} xl={8} xxl={6} key={id}>
                        <ProjectStatisticCard
                            id={id}
                            title={list[id].title}
                            description={list[id].description}
                            tasksCount={list[id].tasksCount}
                            completedCount={list[id].completedCount}
                        />
                    </Col>
                ))
            }
        </Row>
        );
}