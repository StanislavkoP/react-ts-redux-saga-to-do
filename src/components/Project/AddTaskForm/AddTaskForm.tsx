import React from 'react';
import { IAssignedUser } from "types/user";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { Button, Checkbox, Col, Form, Row } from "antd";
import { UsersSelectContainer } from "containers/UsersSelectContainer/UsersSelectContainer";
import { Textarea } from "components/Common/Textarea/Textarea";
import { FormikErrors, FormikValues } from "formik";

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

interface INewTaskForm {
    errors: FormikErrors<FormikValues>;
    values: FormikValues;
    isDirty: boolean;
    isValid: boolean;
    isSubmitting: boolean;
    onChangeField: (e: React.ChangeEvent) => void;
    onChangeCheckbox: (e: CheckboxChangeEvent) => void;
    onChangeAssignedUser: (user: IAssignedUser | undefined) => void;
    onSubmit: () => void;
    onClearForm: () => void;
    onCloseModal: () => void;

}

export function AddTaskForm({
    errors,
    values,
    isDirty,
    isValid,
    isSubmitting,
    onChangeField,
    onChangeCheckbox,
    onChangeAssignedUser,
    onClearForm,
    onSubmit,
    onCloseModal
}: INewTaskForm) {
    return (
        <Form {...layout} >
            <Form.Item
                label="Assigned"
                wrapperCol={{ ...layout.wrapperCol }}
            >
                <UsersSelectContainer
                    value={values.assigned || undefined}
                    onChange={onChangeAssignedUser}
                />
            </Form.Item>

            <Form.Item
                label="Description"
                wrapperCol={{ ...layout.wrapperCol }}
                validateStatus={errors.description ? "error" : undefined}
                help={errors.description}
            >
                <Textarea
                    name="description"
                    value={values.description}
                    onChange={onChangeField}
                    placeholder='Project description'
                    autoSize={{ minRows: 3, maxRows: 5 }}
                />
            </Form.Item>

            <Form.Item
                label="Completed"
                wrapperCol={{ ...layout.wrapperCol}}
            >
                <Checkbox name='completed' onChange={onChangeCheckbox} checked={values.completed} />
            </Form.Item>

                <Row>
                    <Col span={8}>
                        <Button
                            type='primary'
                            block
                            onClick={onSubmit}
                            loading={isSubmitting}
                            disabled={!isDirty || !isValid}
                        >
                            Add
                        </Button>
                    </Col>
                    <Col span={8}>
                        <Button
                            type='primary'
                            block
                            danger
                            onClick={onClearForm}
                            disabled={isSubmitting || !isDirty}
                        >
                            Clear
                        </Button>
                    </Col>
                    <Col span={8}>
                        <Button
                            onClick={onCloseModal}
                            block
                        >
                            Close
                        </Button>
                    </Col>
                </Row>

        </Form>

    );
}