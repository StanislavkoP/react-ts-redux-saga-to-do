import React from 'react';
import { useDispatch } from "react-redux";
import { useFormik } from 'formik';
import { IProjectForm } from "types/project";
import { ProjectsActions } from "redux/projects/actions";
import { projectValidationSchema } from "validationSchemas";
import { ProjectApi } from "Api/ProjectApi";
import { message } from "antd";
import { AddProjectForm } from "components/Projects/AddProjectForm/AddProjectForm";

interface IAddProjectFormContainer {
    onOpenModal: () => void;
}


export function AddProjectFormContainer({ onOpenModal }: IAddProjectFormContainer) {
    const dispatch = useDispatch();
    const formik = useFormik<IProjectForm>({
        initialValues: {
            title: '',
            description: '',
        },
        validationSchema: projectValidationSchema,
        onSubmit: () => {}
    });

    async function onCreateProject() {
        const values = formik.values;
        const errors = await formik.validateForm();
        if (Object.keys(errors).length) {
            return;
        }

        formik.setSubmitting(true);

        const newProjectData = {
            ...values,
            completedCount: 0,
            tasksCount: 0,
            tasks: {},
        };

        ProjectApi.createProject(newProjectData)
            .then((project) => {
                dispatch(ProjectsActions.createProject(project));

                message.success('You added a new project successfully');
                formik.resetForm();
                onOpenModal();
            })
            .catch((error) => {
                console.log(error);
                formik.setSubmitting(false);
            });
    }

    function onCancelForm() {
        formik.resetForm();
        onOpenModal();
    }


    return (
        <AddProjectForm
            errors={formik.errors}
            values={formik.values}
            isSubmitting={formik.isSubmitting}
            onSubmit={onCreateProject}
            onCancel={onCancelForm}
            onChangeField={formik.handleChange}
        />
    );
}