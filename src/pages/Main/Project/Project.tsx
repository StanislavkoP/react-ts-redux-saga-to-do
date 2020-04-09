import React from 'react';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from "redux/rootReducer";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Space, Row, Col, Divider } from "antd";
import { ButtonCreateTask } from "containers/Project/Task/ButtonCreateTask/ButtonCreateTask";
import { ProjectHeaderPage } from "containers/Project/ProjectHeaderPage/ProjectHeaderPage";
import { TaskListContainer } from "containers/Project/Task/TaskListContainer/TaskListContainer";
import { Title } from "components/common/Title/Title";

interface IPageParams {
    id: string;
}

export function Project() {
    const isProjectsLoading = useTypedSelector(state => state.projectsReducer.isLoading);
    const pageParams = useParams<IPageParams>();
    const projectId = pageParams.id;
    
    if (isProjectsLoading) return <Spin className='project-page__content-spin' indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} tip="Loading..." />;

    return (
        <Row justify="center">
            <Col xs={24} sm={24} lg={24} xl={16}>
                <div className="project-page">
                    <ProjectHeaderPage projectId={projectId}/>
                    <Divider orientation="left">
                        <Space>
                            <Title level={3} className="project-page__title">Tasks</Title>
                            <ButtonCreateTask projectId={projectId}/>
                        </Space>
                    </Divider>
                    <TaskListContainer projectId={projectId}/>
                </div>
            </Col>
        </Row>

    );
}