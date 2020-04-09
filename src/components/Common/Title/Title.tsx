import React from 'react';
import { Typography } from 'antd';

const { Title: AntTitle } = Typography;

interface ITitle {
    className?: string;
    level?: 4 | 1 | 2 | 3;
    children: any;
}

export function Title({
    className,
    level,
    children
}: ITitle) {
    return (
        <AntTitle className={className} level={level}>{ children }</AntTitle>
    );
}