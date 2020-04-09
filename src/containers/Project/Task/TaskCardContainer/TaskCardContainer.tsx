import React from 'react';
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useTypedSelector } from "redux/rootReducer";
import { ProjectsActions } from "redux/projects/actions";
import { taskValidationSchema } from "validationSchemas";
import { IProject, ITask, ITaskForm } from "types/project";
import { IAssignedUser } from "types/user";
import { ProjectApi } from "Api/ProjectApi";
import { TaskApi } from "Api/TaskApi";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { message } from "antd";
import { TaskCard } from "components/Project/TaskList/TaskCard/TaskCard";

interface ITaskCardContainer {
    id: string;
    projectId: string;
}

export function TaskCardContainer({ id, projectId }: ITaskCardContainer) {
    const task:ITask = useTypedSelector(state => state.projectsReducer.projects.list[projectId].tasks[id]);
    const users = useTypedSelector(state => state.usersReducer.users.list);

    const formik = useFormik<ITaskForm>({
        initialValues: {
            description: task.description,
            assigned: task.assigned ? task.assigned.id : null,
            completed: task.completed,
        },
        validationSchema: taskValidationSchema,
        enableReinitialize: true,
        onSubmit: () => {}
    });
    const dispatch = useDispatch();

    async function onUpdateTask() {
        const values = formik.values;
        const errors = await formik.validateForm();
        if (Object.keys(errors).length) {
            return;
        }

        formik.setSubmitting(true);

        const updatedTask: ITask = {
            ...task,
            ...values,
            assigned: values.assigned ? users[values.assigned] : null
        };

        TaskApi.updateTask(projectId, updatedTask)
            .then(async () => {
                const projectRes = await ProjectApi.getProject(projectId);
                const project: IProject = projectRes && projectRes.val();
                const updatedProject: IProject = project;
                const isCompletedFieldChanged = formik.initialValues.completed !== formik.values.completed;

                if (isCompletedFieldChanged) {
                    updatedProject.completedCount = values.completed ? project.completedCount + 1 : project.completedCount - 1;

                }

                await ProjectApi.updateProject(updatedProject);

                dispatch(ProjectsActions.updateProject(updatedProject));

                message.success('You updated a task successfully');
            })
            .catch((error) => {
                if (error && error.message) {
                    message.error(error.message);
                } else {
                    message.error('Error, please try to delete again');
                }

                console.log(error);

            })
            .finally(() => {
                formik.setSubmitting(false);
            });
    }

    function onDelete() {
        formik.setSubmitting(true);

        TaskApi.deleteTask(projectId, id)
            .then(async () => {
                const projectRes = await ProjectApi.getProject(projectId);
                const project: IProject = projectRes && projectRes.val();
                const updatedProject: IProject = project;
                updatedProject.tasksCount = project.tasksCount - 1;
                updatedProject.completedCount = formik.values.completed ? project.completedCount - 1 : project.completedCount;

                await ProjectApi.updateProject(updatedProject);

                dispatch(ProjectsActions.updateProject(updatedProject));

                message.success('You deleted task successfully');
            })
            .catch((error) => {
                if (error && error.message) {
                    message.error(error.message);
                } else {
                    message.error('Error, please try to delete again');
                }

                formik.setSubmitting(false);

                console.log(error);
            });

    }

    function onChangeAssignedUser(user: IAssignedUser | undefined) {
        formik.setFieldValue('assigned', user ? user.id : null);
    }

    function onChangeCheckbox(e: CheckboxChangeEvent) {
        const fieldName = e.target.name;
        const isChecked = e.target.checked;

        if (!fieldName) return;

        formik.setFieldValue(fieldName, isChecked);

    }

    if (!task) return null;
    
    return (
            <TaskCard
                values={formik.values}
                errors={formik.errors}
                isDirty={formik.dirty}
                isLoading={formik.isSubmitting}
                isValid={formik.isValid}
                onSave={onUpdateTask}
                onDelete={onDelete}
                onCancelChanges={formik.resetForm}
                onChangeField={formik.handleChange}
                onChangeCheckbox={onChangeCheckbox}
                onChangeAssignedUser={onChangeAssignedUser}
            />
    );
}
