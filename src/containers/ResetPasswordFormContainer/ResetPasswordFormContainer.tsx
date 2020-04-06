import React from 'react';
import { useFormik } from "formik";
import firebase from "firebase/app";
import { message } from "antd";
import { ResetPasswordForm } from "components/ResetPasswordForm/ResetPasswordForm";

type FormikValues = {
    email: string;
}

function ResetPasswordFormContainer() {
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: onFinish
    });

    function onFinish({ email }: FormikValues) {
        firebase
            .auth()
            .sendPasswordResetEmail(email)
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

                console.log(error)
            })
            .finally(() => {
                formik.setSubmitting(false)
            })
    }

    return (
        <ResetPasswordForm
            values={formik.values}
            isLoading={formik.isSubmitting}
            handleField={formik.handleChange}
            onFinish={formik.submitForm}
        />
    );
}

export default ResetPasswordFormContainer;