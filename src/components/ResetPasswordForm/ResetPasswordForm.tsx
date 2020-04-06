import React, {ChangeEvent} from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button  } from 'antd';

interface IResetPasswordForm {
    values: {
        email: string,
    };
    isLoading: boolean;
    handleField: (e: ChangeEvent<any>) => void;
    onFinish: (values: object) => void;
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

export function ResetPasswordForm({
   values,
   isLoading,
   handleField,
   onFinish,
}: IResetPasswordForm) {

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

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" loading={isLoading} htmlType="submit" className="login-form-button">
                        Send
                    </Button>
                    Or
                    <Link to='/signin'>
                        <Button type="primary" loading={isLoading} htmlType="button" className="login-form-button">
                            Sign In
                        </Button>
                    </Link>
                </Form.Item>
            </Form>
    );
}