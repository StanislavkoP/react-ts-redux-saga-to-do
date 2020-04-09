import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from 'formik';
import { Routes } from "constants/routes";
import { AuthContextApi } from "contexts/authContextApi";
import { message } from "antd";
import { SignInForm } from "components/Auth/SignInForm/SignInForm";


const schemaValidation = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required field'),
    password: Yup.string()
        .min(6, 'Min length is 6')
        .max(16, 'Max length is 16')
        .required('Required field'),
});


interface ISignInForm {
    email: string;
    password: string;
}

export function SignInFormContainer({}) {
    const history = useHistory();
    const formik = useFormik<ISignInForm>({
        initialValues: {
            email: '',
            password: '',
        },
        validateOnChange: false,
        validateOnBlur: false,
        validationSchema: schemaValidation,
        onSubmit: () => {}
    });
    const useAuthContextApi = useContext(AuthContextApi);

    async function onSignIn() {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length) {
            return;
        }

        formik.setSubmitting(true);

        useAuthContextApi?.logIn(formik.values.email, formik.values.password)
            .then(() => {
                message.success('You signed in successfully');
            })
            .catch((error) => {

                if (error && error.message) {
                    message.error({
                        content: error.message,
                        duration: 5
                    });
                } else {
                    message.error('Error, please try to sign in again');
                }

                formik.setSubmitting(false);

                console.log(error);
            });
    }

    function onSignUp() {
        history.push(Routes.SIGN_UP);
    }


    return (
        <SignInForm
            errors={formik.errors}
            values={formik.values}
            isLoading={formik.isSubmitting}
            handleField={formik.handleChange}
            onSignIn={onSignIn}
            onSignUp={onSignUp}
        />
    );
}