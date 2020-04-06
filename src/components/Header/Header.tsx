import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

interface IHeader {
    path: string
}

export function Header({ path }: IHeader) {
    return (
        <Menu selectedKeys={[path]} mode="horizontal">
            <Menu.Item key="logout">
                <Link to="/logout">
                    Log Out
                </Link>
            </Menu.Item>
        </Menu>
    );
}