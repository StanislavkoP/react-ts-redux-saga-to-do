import React, { useContext, useMemo } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { IProject, IProjectForm } from "types/project";
import { useTypedSelector } from "redux/rootReducer";
import { ProjectsActions } from "redux/projects/actions";
import { ProjectContextApi } from "contexts/projectContextApi";
import { projectValidationSchema } from "validationSchemas";
import { Form, Button, Descriptions, PageHeader, Space, message } from "antd";
import { Textarea } from "components/common/Textarea/Textarea";
import { Title } from "components/common/Title/Title";

interface IHeaderPage {
    projectId: IProject['id'];
}

export function ProjectHeaderPage({
    projectId,
}: IHeaderPage) {
    const projects = useTypedSelector(state => state.projectsReducer.projects.list);
    const project = useMemo(() => projects[projectId], [projects]);
    const formik = useFormik<IProjectForm>({
        initialValues: {
            title: project.title,
            description: project.description,
        },
        validationSchema: projectValidationSchema,
        enableReinitialize: true,
        onSubmit: () => {},
    });
    const history = useHistory();
    const dispatch = useDispatch();
    const useProjectApiCtx = useContext(ProjectContextApi);

    async function onUpdateProject() {
        const values = formik.values;
        const errors = await formik.validateForm();
        if (Object.keys(errors).length) {
            return;
        }

        formik.setSubmitting(true);

        const updatedProject = project;
        if (!updatedProject) {
            message.error(`This project doesn't exist`);
            return;
        }

        const newProjectData = {
            ...updatedProject,
            title: values.title,
            description: values.description
        };

        useProjectApiCtx?.updateProject(newProjectData)
            .then(() => {
                dispatch(ProjectsActions.updateProject(newProjectData));
                message.success('You updated the project successfully');
            })
            .catch((error) => {
                if (error && error.message) {
                    message.error(error.message);
                } else {
                    message.error('Error, project is not updated');
                }

            })
            .finally(() => {
                formik.setSubmitting(false);
            });

    }

    function onCancel() {
        formik.resetForm();
    }


    return (
        <PageHeader
            className='project-page__header'
            onBack={() => history.push('/')}
            title={<Title className="project-page__page-id">{ `ID: ${ project.id }` }</Title>}
        >
            <Form className="project-page__form">
                <Descriptions column={1} className="project-page__page-descriptions">
                    <Descriptions.Item label="Title" className="project-page__page-title">
                        <Form.Item
                            className="project-page__form-item"
                            validateStatus={formik.errors.title ? "error" : undefined}
                            help={formik.errors.title}
                        >
                            <Textarea
                                className="project-page__page-title-text"
                                name='title'
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                autoSize={{ minRows: 1, maxRows: 4 }}
                            />
                        </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label="Description">
                        <Form.Item
                            className="project-page__form-item"
                            validateStatus={formik.errors.description ? "error" : undefined}
                            help={formik.errors.description}
                        >
                            <Textarea
                                className="project-page__page-description"
                                name='description'
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                autoSize={{ minRows: 1, maxRows: 7 }}
                            />
                        </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item>
                        <Space>
                            <Button onClick={onUpdateProject} loading={formik.isSubmitting} disabled={!formik.dirty || !formik.isValid}>Save</Button>
                            <Button danger onClick={onCancel} disabled={!formik.dirty || formik.isSubmitting}>Cancel</Button>
                        </Space>
                    </Descriptions.Item>
                </Descriptions>
            </Form>
        </PageHeader>

    );
}