import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Input, Button, Space, Row } from 'antd';

interface ILoginForm {
    errors: {
        email?: string;
        password?: string;
        confirmPassword?: string;
    };
    values: {
        email: string,
        password: string
    };
    isLoading: boolean;
    handleField: (e: React.ChangeEvent) => void;
    onSignIn: () => void;
    onSignUp: () => void;
}

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
};

export function SignInForm({
    errors,
    values,
    isLoading,
    handleField,
    onSignIn,
    onSignUp,
}: ILoginForm) {
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
            <Form.Item>
                <Row justify='center'>
                    <NavLink className="login-form-forgot" to='/resetpass'>
                        <Button type='link' disabled={isLoading}>
                            Forgot password?
                        </Button>
                    </NavLink>
                </Row>
            </Form.Item>

            <Form.Item>
                <Row justify='center'>
                    <Space>
                        <Button
                            type="primary"
                            className="login-form-button"
                            loading={isLoading}
                            onClick={onSignIn}
                        >
                            Sign In
                        </Button>
                        Or
                        <Button
                            className="login-form-button"
                            disabled={isLoading}
                            onClick={onSignUp}
                        >
                            Sign Up
                        </Button>
                    </Space>
                </Row>
            </Form.Item>
        </Form>
    );
}