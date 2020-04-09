import React from 'react';
import { FormikErrors } from "formik";
import { Button, Col, Form, Input, Row } from "antd";
import { IProjectForm } from "types/project";
import { Textarea } from "components/Common/Textarea/Textarea";

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

interface IAddProjectForm {
    isSubmitting: boolean;
    values: IProjectForm;
    errors: FormikErrors<IProjectForm>;
    onSubmit: () => void;
    onChangeField: (e: React.ChangeEvent) => void;
    onCancel: () => void;
}

export function AddProjectForm({
    errors,
    values,
    isSubmitting,
    onSubmit,
    onCancel,
    onChangeField,
}: IAddProjectForm) {
    return (
        <Form {...layout}>
            <Form.Item
                label="Title"
                wrapperCol={{ ...layout.wrapperCol }}
                validateStatus={errors.title ? "error" : undefined}
                help={errors.title}
            >
                <Input
                    name="title"
                    value={values.title}
                    onChange={onChangeField}
                    placeholder='Project title'
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
            <Row justify="space-between">
                <Col span={11}>
                    <Button type='primary' block onClick={onSubmit} loading={isSubmitting}>Add</Button>
                </Col>
                <Col span={11}>
                    <Button  type='primary' block danger onClick={onCancel}>Cancel</Button>
                </Col>
            </Row>
        </Form>

    );
}