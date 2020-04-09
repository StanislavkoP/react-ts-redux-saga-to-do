import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from "antd";

export function Fallback() {
    return (
        <Spin className="main-fallback" indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} tip="Loading..." />
    );
}