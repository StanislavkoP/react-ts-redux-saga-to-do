import React from 'react';
import { Col, Row } from "antd";
import { ProjectsStatisticListContainer } from "containers/Statistic/ProjectsStatisticListContainer/ProjectsStatisticListContainer";

export default function Statistic() {

    return (
        <Row justify="center">
            <Col sm={24} lg={16}>
                <ProjectsStatisticListContainer />
            </Col>
        </Row>
    );
}