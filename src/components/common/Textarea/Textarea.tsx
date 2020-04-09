import React from 'react';
import classnames from 'classnames';
import { Input } from "antd";
import { AutoSizeType } from "antd/es/input/ResizableTextArea";

const { TextArea } = Input;

interface ITextarea {
    className?: string;
    value: string;
    onChange: (e: React.ChangeEvent) => void;
    name?: string;
    placeholder?: string;
    autoSize?: boolean | AutoSizeType;
}

export function Textarea({
    className,
    value,
    onChange,
    autoSize,
    name,
    placeholder
}: ITextarea) {
    return (
        <TextArea
            className={classnames(className, 'textarea')}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoSize={autoSize}
        />

    );
}