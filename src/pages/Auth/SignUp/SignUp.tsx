import React, { Component } from 'react';
import { SignUpFormContainer } from "containers/Auth/SignUpFormContainer/SignUpFormContainer";
import { Col, Row } from "antd";
import { Title } from "components/Common/Title/Title";

export class SignUp extends Component {
    render() {
        return (
            <Row justify='center'>
                <Col lg={12} sm={16} xs={24} xl={8}>
                    <Title className='signup-page__title'>Sign Up</Title>
                    <SignUpFormContainer />
                </Col>
            </Row>
        );
    }
}