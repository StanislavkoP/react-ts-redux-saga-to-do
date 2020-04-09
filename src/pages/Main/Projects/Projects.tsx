import React from 'react';
import { useTypedSelector } from "redux/rootReducer";
import { LoadingOutlined } from '@ant-design/icons';
import { Col, Row, Space, Spin } from "antd";
import { ProjectListContainer } from "containers/Projects/ProjectListContainer/ProjectListContainer";
import { ButtonCreateNewProject } from "containers/Projects/ButtonCreateNewProject/ButtonCreateNewProject";
import { Title } from "components/common/Title/Title";

export function Projects() {
    const isProjectsLoading = useTypedSelector(state => state.projectsReducer.isLoading);

    return (
        <Row justify="center">
            <Col sm={24} lg={16}>
                <Space className='projects-page__header'>
                    <Title className='projects-page__header-title'>Projects</Title>
                    <ButtonCreateNewProject disabled={isProjectsLoading} />
                </Space>
                <div className='projects-page__content'>
                    {
                        isProjectsLoading
                            ? <Spin className='projects-page__content-spin' indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} tip="Loading..." />
                            :  <ProjectListContainer />
                    }
                </div>
            </Col>
        </Row>

    );
}