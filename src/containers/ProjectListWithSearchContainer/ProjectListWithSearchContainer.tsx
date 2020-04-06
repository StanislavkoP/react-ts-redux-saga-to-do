import React, {useEffect, useState} from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTypedSelector } from "redux/rootReducer";
import { ProjectsActions } from "redux/projects/actions";
import { IProject } from "types/project";
import { EditOutlined, DeleteOutlined, SelectOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Popover, Form, Input } from 'antd';

const { Meta } = Card;
const { TextArea } = Input;

export function ProjectListWithSearchContainer() {
    const dispatch = useDispatch();
    const history = useHistory();
    const projects = useTypedSelector(state => state.projectsReducer.projects);
    const [isOpenNewProject, setIsOpenNewProject] = useState<boolean>(false);

    useEffect(() => {
        dispatch(ProjectsActions.getProjects());
    }, []);

    function onOpenProject(id: IProject['id']) {
        history.push(`/projects/${id}`)
    }

    function onEditProject(e: React.MouseEvent, id: IProject['id']) {
        console.log(id)
    }

    function onDeleteProject(e: React.MouseEvent, id: IProject['id']) {
        e.stopPropagation();
        console.log(id)
    }

    function onAddProject() {

    }

    function onChangeOpenNewProject() {
        setIsOpenNewProject(prevState => !prevState)
    }

    return (
        <div>
            <div>
                <h1>Dashboard</h1>
            </div>
            <Popover
                content={
                    <Form>
                        <Form.Item
                            label="Title"
                        >
                            <Input name="username" placeholder='Project title' />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                        >
                            <TextArea
                                // value={value}
                                // onChange={this.onChange}
                                name="description"
                                placeholder='Project description'
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                        </Form.Item>
                        <Button type='primary' onClick={onChangeOpenNewProject}>Add</Button>
                        <Button  type='primary' danger onClick={onChangeOpenNewProject}>Cancel</Button>
                    </Form>
                }
                title="Add new project"
                trigger="click"
                placement='rightTop'
                visible={isOpenNewProject}
                onVisibleChange={onChangeOpenNewProject}
            >
                <Button type="primary" icon={<PlusOutlined />} onClick={onAddProject}>Add project</Button>
            </Popover>
            {
                projects.map((project) => (
                        <Card
                            key={project.id}
                            style={{ maxWidth: 300, width: '100%' }}
                            actions={[
                                <SelectOutlined key="open" onClick={() => onOpenProject(project.id)} />,
                                <EditOutlined key="edit" onClick={(e) => onEditProject(e, project.id)} />,
                                <DeleteOutlined key='delete' onClick={(e) => onDeleteProject(e, project.id)} />,
                            ]}
                        >
                            <Meta
                                title={project.title}
                                description={project.description}
                            />
                        </Card>
                ))
            }
        </div>
    );
}