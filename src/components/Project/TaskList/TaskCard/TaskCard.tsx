import React from 'react';
import { FormikErrors } from "formik";
import { IAssignedUser } from "types";
import { ITaskForm } from "types/project";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, List, Spin } from "antd";
import { UsersSelectContainer } from "containers/UsersSelectContainer/UsersSelectContainer";
import { Textarea } from "components/common/Textarea/Textarea";

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};


interface ITaskCard {
    values: ITaskForm;
    errors: FormikErrors<ITaskForm>;
    isDirty: boolean;
    isLoading: boolean;
    isValid: boolean;
    onSave: () => void;
    onDelete: () => void;
    onCancelChanges: () => void;
    onChangeField: (e: React.ChangeEvent) => void;
    onChangeCheckbox: (e: CheckboxChangeEvent) => void;
    onChangeAssignedUser: (user: IAssignedUser | undefined) => void;
}

export function TaskCard({
    values,
    errors,
    isValid,
    isLoading,
    isDirty,
    onSave,
    onDelete,
    onCancelChanges,
    onChangeField,
    onChangeCheckbox,
    onChangeAssignedUser,
}: ITaskCard) {
    return (
        <List.Item>
            <Spin className="task-card__spin-wrap" spinning={isLoading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
                <List.Item
                    className="task-card"
                    actions={[
                        <Button
                            key="save"
                            type='link'
                            disabled={!isDirty || !isValid}
                            onClick={onSave}
                        >
                            Save changes
                        </Button>,
                        <Button
                            key="cancel"
                            type='link'
                            style={{color: '#722ed1'}}
                            disabled={!isDirty}
                            onClick={onCancelChanges}
                        >
                            Cancel changes
                        </Button>,
                        <Button
                            key="delete"
                            type='link'
                            danger
                            onClick={onDelete}
                        >
                            Delete
                        </Button>
                    ]}
                >
                    <Form className='task-card__form' {...layout}>
                        <Form.Item
                            label="Text"
                            wrapperCol={{ ...layout.wrapperCol }}
                            validateStatus={errors.description ? "error" : undefined}
                            help={errors.description}
                        >
                            <Textarea
                                className='task-card__form-desc'
                                name="description"
                                value={values.description}
                                onChange={onChangeField}
                                placeholder='Project description'
                                autoSize={{ minRows: 1, maxRows: 5 }}
                            />

                        </Form.Item>
                        <Form.Item
                            label="Assigned"
                            wrapperCol={{ ...layout.wrapperCol }}
                        >
                            <UsersSelectContainer
                                onChange={onChangeAssignedUser}
                                value={values.assigned || undefined}
                                className='task-card__select'
                            />
                        </Form.Item>
                        <Form.Item
                            label="Completed"
                            wrapperCol={{ ...layout.wrapperCol }}
                        >
                            <Checkbox
                                name='completed'
                                onChange={onChangeCheckbox}
                                checked={values.completed}
                            />
                        </Form.Item>
                    </Form>
                </List.Item>
            </Spin>
        </List.Item>

    );
}