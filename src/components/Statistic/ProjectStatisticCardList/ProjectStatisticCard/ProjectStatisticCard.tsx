import React from 'react';
import { Card,  Descriptions } from "antd";
import { IProject } from "types/project";

interface IProjectStatisticCard {
    id: IProject['id'];
    title: IProject['title'];
    description: IProject['description'];
    tasksCount: IProject['tasksCount'];
    completedCount: IProject['completedCount'];
}

export function ProjectStatisticCard({
    id,
    title,
    description,
    tasksCount,
    completedCount,
}: IProjectStatisticCard) {
    return (
        <Card title={title} className='project-statistic-card' hoverable>
            <Descriptions size="small" column={1} className="project-statistic-card__descriptions">
                <Descriptions.Item label="ID">
                    { id }
                </Descriptions.Item>
                <Descriptions.Item label="Description" className="project-statistic-card__description-desc">
                    {description }
                </Descriptions.Item>
                <Descriptions.Item label="Completed">
                    {`${completedCount}/${tasksCount}`}
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );
}