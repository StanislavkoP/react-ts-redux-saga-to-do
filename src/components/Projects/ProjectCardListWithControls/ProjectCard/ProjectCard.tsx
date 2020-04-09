import React, { useMemo } from 'react';
import { IProject } from "types/project";
import { EditOutlined, DeleteOutlined, SelectOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Card, Input, Form, Descriptions } from "antd";
import { Textarea } from "components/Common/Textarea/Textarea";
import { FormikErrors, FormikValues } from "formik";

const { Meta } = Card;


interface IProjectCardListWithControls {
    id: IProject['id'];
    values: FormikValues;
    errors: FormikErrors<FormikValues>;
    isEditing: boolean;
    isValid: boolean;
    onOpenProject: () => void;
    onEditProject: () => void;
    onCancelEdit: () => void;
    onDeleteProject: () => void;
    onSaveChanges: () => void;
    onChangeField: (e: React.ChangeEvent) => void;
}

export function ProjectCard({
    id,
    values,
    errors,
    isEditing,
    isValid,
    onOpenProject,
    onEditProject,
    onCancelEdit,
    onDeleteProject,
    onSaveChanges,
    onChangeField,
}: IProjectCardListWithControls) {

    const actionButtons = useMemo(() => {
        let buttons = [
            <Button
                key='open'
                className="project-card__button"
                style={{color: '#722ed1'}}
                type='link'
                onClick={onOpenProject}
                icon={<SelectOutlined />}
            />,
            <Button
                key='edit'
                className="project-card__button"
                type='link'
                onClick={onEditProject}
                icon={<EditOutlined />}
            />,
            <Button
                key='delete'
                className="project-card__button"
                type='link'
                danger
                onClick={onDeleteProject}
                icon={<DeleteOutlined/>}
            />,
        ];

        if (isEditing) {
            buttons = [
                <Button
                    key='accept'
                    className="project-card__button"
                    type='link'
                    disabled={!isValid}
                    onClick={onSaveChanges}
                    icon={<CheckOutlined />}
                />,
                <Button
                    key='delete'
                    className="project-card__button"
                    type='link'
                    danger
                    onClick={onCancelEdit}
                    icon={<CloseOutlined />}
                />,
            ];

        }

        return buttons;

    }, [isEditing, isValid]);

    const bodyCard = useMemo(() => {
        let body = (
            <Meta
                title={
                    <Descriptions column={1} className="project-card__descriptions">
                        <Descriptions.Item label='Id' className="project-card__description project-card__description-id">
                            { id }
                        </Descriptions.Item>
                        <Descriptions.Item label='Title' className="project-card__description project-card__description-title">
                            { values.title }
                        </Descriptions.Item>
                    </Descriptions>
                }
                description={
                    <Descriptions column={1} className="project-card__description">
                        <Descriptions.Item label='Description' className="project-card__description project-card__description-desc">
                            { values.description }
                        </Descriptions.Item>
                    </Descriptions>
                }
            />
        );

        if (isEditing) {
            body = (
                <Form layout='vertical' className="project-card__form">
                    <Meta
                        title={
                            <Form.Item
                                label="Title"
                                validateStatus={errors.title ? "error" : undefined}
                                help={errors.title}
                            >
                                <Input
                                    type="text"
                                    name='title'
                                    value={values.title}
                                    onChange={onChangeField}
                                    placeholder='Project title'
                                />
                            </Form.Item>
                        }
                        description={
                            <Form.Item
                                label="Description"
                                validateStatus={errors.description ? "error" : undefined}
                                help={errors.description}
                            >
                                <Textarea
                                    name="description"
                                    value={values.description}
                                    onChange={onChangeField}
                                    placeholder='Project description'
                                    autoSize={{ minRows: 1, maxRows: 5 }}
                                />
                            </Form.Item>
                        }
                    />
                </Form>

            );

        }

        return body;

    }, [isEditing, values, errors]);

    return (
        <Card
            className='project-card'
            hoverable
            actions={ actionButtons }
        >
            { bodyCard }
        </Card>
    );
}