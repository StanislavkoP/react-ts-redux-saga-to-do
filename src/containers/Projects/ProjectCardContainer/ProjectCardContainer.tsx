import React, { useContext, useMemo, useState } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import { IProject, IProjectForm } from "types/project";
import { Routes } from "constants/routes";
import { ProjectsActions } from "redux/projects/actions";
import { useTypedSelector } from "redux/rootReducer";
import { projectValidationSchema } from "validationSchemas";
import { LoadingOutlined } from '@ant-design/icons';
import { Col, message, Spin } from "antd";
import { ProjectCard } from "components/Projects/ProjectCardListWithControls/ProjectCard/ProjectCard";
import { ProjectContextApi } from "contexts/projectContextApi";


interface IProjectCardContainer {
    id: IProject['id'];
}

function ProjectCardContainerComp({
    id,
}: IProjectCardContainer) {
    const projects = useTypedSelector(state => state.projectsReducer.projects.list, (props) => true);
    const project = useMemo(() => projects[id], []);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const formik = useFormik<IProjectForm>({
        initialValues: {
            title: project.title,
            description: project.description
        },
        validationSchema: projectValidationSchema,
        onSubmit: () => {},
    });
    const history = useHistory();
    const dispatch = useDispatch();
    const useProjectApiCtx = useContext(ProjectContextApi);

    async function onSaveChanges() {
        const values = formik.values;
        const errors = await formik.validateForm();
        if (Object.keys(errors).length) {
            return;
        }

        formik.setSubmitting(true);

        const updatedProject = projects[id];
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
                setIsEditing(false);
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

    function onDeleteProject() {
        formik.setSubmitting(true);

        useProjectApiCtx?.deleteProject(id)
            .then(() => {
                dispatch(ProjectsActions.deleteProject({ id }));
                message.success('You deleted project successfully');

            })
            .catch((error) => {
                if (error && error.message) {
                    message.error(error.message);
                } else {
                    message.error('Error, project is not deleted');
                }

                formik.setSubmitting(false);
            });
    }


    function onOpenProject() {
        history.push(`${Routes.PROJECT_PUSH}/${id}`);
    }

    function onEditProject() {
        setIsEditing(prevState => !prevState);
    }

    function onCancelEdit () {
        formik.resetForm();
        setIsEditing(false);
    }


    return (
        <Col xs={24} sm={12} lg={8} xl={8} xxl={6}>
            <Spin spinning={formik.isSubmitting} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
                <ProjectCard
                    id={id}
                    values={formik.values}
                    errors={formik.errors}
                    isEditing={isEditing}
                    isValid={formik.isValid}
                    onOpenProject={onOpenProject}
                    onEditProject={onEditProject}
                    onCancelEdit={onCancelEdit}
                    onDeleteProject={onDeleteProject}
                    onSaveChanges={onSaveChanges}
                    onChangeField={formik.handleChange}
                />
            </Spin>
        </Col>
    );
}

export const ProjectCardContainer = React.memo(ProjectCardContainerComp, () => true);