import React, { Component } from 'react';
import { SignInFormContainer } from "containers/Auth/SignInFormContainer/SignInFormContainer";
import { Title } from "components/common/Title/Title";
import { Col, Row } from "antd";

export class SignIn extends Component {
    render() {
        return (
            <Row justify='center'>
                <Col lg={12} sm={16} xs={24} xl={8}>
                    <Title className='signin-page__title' >Sign In</Title>
                    <SignInFormContainer />
                </Col>
            </Row>
        );
    }
}