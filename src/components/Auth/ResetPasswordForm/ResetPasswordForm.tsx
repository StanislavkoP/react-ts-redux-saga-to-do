import React from 'react';
import { Form, Input, Button, Row, Space } from 'antd';

interface IResetPasswordForm {
    values: {
        email: string,
    };
    isLoading: boolean;
    handleField: (e: React.ChangeEvent) => void;
    onReset: () => void;
    onSignIn: () => void;
}

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
};

export function ResetPasswordForm({
   values,
   isLoading,
   handleField,
    onReset,
    onSignIn
}: IResetPasswordForm) {

    return (
            <Form {...layout}>
                <Form.Item
                    label="Email"
                >
                    <Input
                        type="email"
                        name='email'
                        placeholder="Your email"
                        value={values.email}
                        onChange={handleField}
                    />
                </Form.Item>

                <Form.Item>
                    <Row justify='center'>
                        <Space>
                            <Button
                                type="primary"
                                loading={isLoading}
                                onClick={onReset}
                            >
                                Send
                            </Button>
                            Or
                            <Button
                                disabled={isLoading}
                                onClick={onSignIn}
                            >
                                Sign In
                            </Button>
                        </Space>
                    </Row>
                </Form.Item>
            </Form>
    );
}