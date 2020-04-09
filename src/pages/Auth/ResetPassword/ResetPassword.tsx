import React, { Component } from 'react';
import { ResetPasswordFormContainer } from "containers/Auth/ResetPasswordFormContainer/ResetPasswordFormContainer";
import { Col, Row } from "antd";
import { Title } from "components/Common/Title/Title";

export class ResetPassword extends Component {
    render() {
        return (
            <Row justify='center'>
                <Col lg={12} sm={16} xs={24} xl={8}>
                    <Title className='reset-pass-page__title'>Reset password</Title>
                    <ResetPasswordFormContainer />
                </Col>
            </Row>
        );
    }
}