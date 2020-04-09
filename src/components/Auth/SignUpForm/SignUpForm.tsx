import React  from 'react';
import { Form, Input, Button, Space, Row } from 'antd';

interface ISignUpForm {
    errors: {
        email?: string;
        password?: string;
        confirmPassword?: string;
    };
    values: {
        email: string,
        password: string,
        confirmPassword: string
    };
    isLoading: boolean;
    handleField: (e: React.ChangeEvent) => void;
    onSignIn: () => void;
    onSignUp: () => Promise<void>;
}

const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 24 },
};

export function SignUpForm({
    errors,
    values,
    handleField,
    isLoading,
    onSignIn,
    onSignUp,
}: ISignUpForm) {
    return (
        <Form
            className="login-form"
            {...layout}
        >
            <Form.Item
                label="Email"
                validateStatus={errors.email ? "error" : undefined}
                help={errors.email}
            >
                <Input
                    type="email"
                    name='email'
                    placeholder="Email"
                    value={values.email}
                    onChange={handleField}
                />
            </Form.Item>
            <Form.Item
                label="Password"
                validateStatus={errors.password ? "error" : undefined}
                help={errors.password}

            >
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleField}
                />
            </Form.Item>

            <Form.Item
                label="Confirm password"
                validateStatus={errors.confirmPassword ? "error" : undefined}
                help={errors.confirmPassword}

            >
                <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={values.confirmPassword}
                    onChange={handleField}
                />
            </Form.Item>

            <Form.Item>
                <Row justify='center'>
                    <Space>
                        <Button
                            type="primary"
                            loading={isLoading}
                            onClick={onSignUp}
                        >
                            Sign Up
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