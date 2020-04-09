import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Layout, Menu, Row } from 'antd';

const { Header: AntHeader } = Layout;

interface IHeader {
    path: string;
    userName: string | null | undefined;
}

export function Header({ path, userName }: IHeader) {
    return (
        <AntHeader className="main-header">
            <Row justify="center">
                <Col xs={24} sm={24} lg={16}>
                    <Row justify="space-between">
                        <Col xs={18} sm={12}>
                            <div className="main-header__user">
                                Hello { userName || null }
                            </div>

                        </Col>

                        <Col xs={1} sm={12}>
                            <Menu className="main-header__menu" selectedKeys={[path]} mode="horizontal">
                                <Menu.Item key="/">
                                    <Link to="/">
                                        Projects
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="/statistic">
                                    <Link to="/statistic">
                                        Statistic
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="/logout">
                                    <Link to="/logout">
                                        Log Out
                                    </Link>
                                </Menu.Item>
                            </Menu>

                        </Col>
                    </Row>

                </Col>
            </Row>

        </AntHeader>
    );
}