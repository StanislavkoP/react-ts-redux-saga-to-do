import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Popover } from "antd";
import { AddTaskFormContainer } from "../AddTaskFormContainer/AddTaskFormContainer";

interface IButtonCreateTas {
    projectId: string;
}

export function ButtonCreateTask({
    projectId
}: IButtonCreateTas) {
    const [isOpenNewTask, setIsOpenNewTask] = useState<boolean>(false);

    function onOpenCreateNewTask() {
        setIsOpenNewTask(prevState => !prevState);
    }


    return (
        <Popover
            overlayStyle={{width: '400px'}}
            content={ <AddTaskFormContainer projectId={projectId} onOpenModal={onOpenCreateNewTask} /> }
            title="Add new task"
            trigger="click"
            placement='rightTop'
            visible={isOpenNewTask}
            onVisibleChange={onOpenCreateNewTask}
        >
            <Button type="primary" icon={<PlusOutlined />}>Add task</Button>
        </Popover>

    );
}