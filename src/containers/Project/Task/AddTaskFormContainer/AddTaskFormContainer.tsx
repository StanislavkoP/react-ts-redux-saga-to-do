import React, { useContext } from 'react';
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { IAssignedUser } from "types";
import { IProject, ITaskForm } from "types/project";
import { ProjectsActions } from "redux/projects/actions";
import { useTypedSelector } from "redux/rootReducer";
import { taskValidationSchema } from "validationSchemas";
import { ProjectContextApi } from "contexts/projectContextApi";
import { TaskContextApi } from "contexts/taskContextApi";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { message } from "antd";
import { AddTaskForm } from "components/Project/AddTaskForm/AddTaskForm";


interface IAddTaskFormContainer {
    projectId: string;
    onOpenModal: () => void;
}

export function AddTaskFormContainer({ projectId, onOpenModal }: IAddTaskFormContainer) {
    const users = useTypedSelector(state => state.usersReducer.users.list);
    const formik = useFormik<ITaskForm>({
        initialValues: {
            description: '',
            assigned: null,
            completed: false,
        },
        validationSchema: taskValidationSchema,
        onSubmit: () => {}
    });
    const dispatch = useDispatch();
    const useTaskApiCtx = useContext(TaskContextApi);
    const useProjectApiCtx = useContext(ProjectContextApi);



    async function onCreateTask() {
        const values = formik.values;
        const errors = await formik.validateForm();
        if (Object.keys(errors).length) {
            return;
        }

        formik.setSubmitting(true);

        const newTask = {
            ...values,
            assigned: values.assigned ? users[values.assigned] : null
        };

        useTaskApiCtx?.createTask(projectId, newTask)
            .then(async () => {
                const projectRes = await useProjectApiCtx?.getProject(projectId);
                const project: IProject = projectRes && projectRes.val();
                const updatedProject: IProject = project;
                updatedProject.tasksCount = project.tasksCount + 1;
                updatedProject.completedCount = values.completed ? project.completedCount + 1 : project.completedCount;

                await useProjectApiCtx?.updateProject(updatedProject);

                dispatch(ProjectsActions.updateProject(updatedProject));

                message.success('You added a new task successfully');
                formik.resetForm();
                onOpenModal();
            })
            .catch((error) => {
                if (error && error.message) {
                    message.error(error.message);
                } else {
                    message.error('Error, please try to add again');
                }

                console.log(error);
            })
            .finally(() => {
                formik.setSubmitting(false);
            });
    }

    function onChangeCheckbox(e: CheckboxChangeEvent) {
        const fieldName = e.target.name;
        const isChecked = e.target.checked;

        if (!fieldName) return;

        formik.setFieldValue(fieldName, isChecked);

    }

    function onChangeAssignedUser(user: IAssignedUser | undefined) {
        formik.setFieldValue('assigned', user ? user.id : null);

    }



    return (
        <AddTaskForm
            values={formik.values}
            errors={formik.errors}
            isSubmitting={formik.isSubmitting}
            isDirty={formik.dirty}
            isValid={formik.isValid}
            onChangeField={formik.handleChange}
            onChangeCheckbox={onChangeCheckbox}
            onChangeAssignedUser={onChangeAssignedUser}
            onSubmit={onCreateTask}
            onClearForm={formik.resetForm}
            onCloseModal={onOpenModal}
        />
    );
}