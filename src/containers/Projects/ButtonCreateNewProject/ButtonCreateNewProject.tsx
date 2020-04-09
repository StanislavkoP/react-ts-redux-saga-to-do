import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Popover } from "antd";
import { AddProjectFormContainer } from "../AddProjectFormContainer/AddProjectFormContainer";

interface IButtonCreateNewProject {
    disabled?: boolean;
}

export function ButtonCreateNewProject({
    disabled
}:IButtonCreateNewProject) {
    const [isOpenNewProject, setIsOpenNewProject] = useState<boolean>(false);

    function onOpenCreateNewProject() {
        if (disabled) return;

        setIsOpenNewProject(prevState => !prevState);
    }


    return (
        <Popover
            overlayStyle={{width: '400px'}}
            content={ <AddProjectFormContainer onOpenModal={onOpenCreateNewProject} /> }
            title="Add new project"
            trigger="click"
            placement='rightTop'
            visible={isOpenNewProject}
            onVisibleChange={onOpenCreateNewProject}
        >
            <Button
                type="primary"
                icon={<PlusOutlined />}
                disabled={disabled}
            >
                Add project
            </Button>
        </Popover>

    );
}