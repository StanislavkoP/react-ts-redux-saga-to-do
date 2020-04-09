import React from 'react';
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Routes } from "constants/routes";
import { AuthApi } from "Api/AuthApi";
import { message } from "antd";
import { ResetPasswordForm } from "components/Auth/ResetPasswordForm/ResetPasswordForm";

const schemaValidation = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required field'),
});

interface ISignInForm {
    email: string;
}

export function ResetPasswordFormContainer() {
    const history = useHistory();
    const formik = useFormik<ISignInForm>({
        initialValues: {
            email: '',
        },
        validationSchema: schemaValidation,
        onSubmit: () => {}
    });

    async function onReset() {
        const values = formik.values;
        const errors = await formik.validateForm();
        if (Object.keys(errors).length) {
            return;
        }

        formik.setSubmitting(true);

        AuthApi.resetPassword(values.email)
            .then(() => {
                message.success({
                    content: 'Check your mail for changing password',
                    duration: 5
                });

            })
            .catch((error) => {
                if (error && error.message) {
                    message.error({
                        content: error.message,
                        duration: 5
                    });
                }

                console.log(error);
            })
            .finally(() => {
                formik.setSubmitting(false);
            });
    }

    function onSignIn() {
        history.push(Routes.SIGN_IN);
    }

    return (
        <ResetPasswordForm
            errors={formik.errors}
            values={formik.values}
            isLoading={formik.isSubmitting}
            handleField={formik.handleChange}
            onReset={onReset}
            onSignIn={onSignIn}
        />
    );
}