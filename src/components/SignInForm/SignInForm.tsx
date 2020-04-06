import React, {ChangeEvent} from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

interface ILoginForm {
    values: {
        email: string,
        password: string
    };
    isLoading: boolean;
    handleField: (e: ChangeEvent<any>) => void;
    onFinish: (values: object) => void;
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

export function SignInForm({
    values,
    isLoading,
    handleField,
    onFinish,
}: ILoginForm) {
    return (
        <Form
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            {...layout}
        >
            <Form.Item
                label="Email"
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
            >
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleField}
                />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <NavLink className="login-form-forgot" to='/resetpass'>
                    Forgot password
                </NavLink>
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" loading={isLoading} htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <NavLink to='/signup'>register now!</NavLink>
            </Form.Item>
        </Form>
    );
}