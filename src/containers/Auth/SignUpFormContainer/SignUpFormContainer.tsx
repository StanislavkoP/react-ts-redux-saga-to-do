import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Routes } from "constants/routes";
import { IUser } from 'types';
import { UserActions } from "redux/user/actions";
import { AuthActions } from 'redux/auth/actions';
import { message } from "antd";
import { SignUpForm } from "components/Auth/SignUpForm/SignUpForm";
import { AuthContextApi } from "contexts/authContextApi";
import { UsersContextApi } from "contexts/usersContextApi";

const schemaValidation = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required field'),
    password: Yup.string()
        .min(6, 'Min length is 6')
        .max(16, 'Max length is 16')
        .required('Required field'),
    confirmPassword: Yup.string()
        .min(6, 'Min length is 6')
        .max(16, 'Max length is 16')
        .required('Required field')
        .test('passwords-match', "Confirm password not equal password", function(value) {
            return this.parent.password === value;
        }),
});


interface ISignUpForm {
    email: string;
    password: string;
    confirmPassword: string;

}

export function SignUpFormContainer() {
    const dispatch = useDispatch();
    const history = useHistory();
    const formik = useFormik<ISignUpForm>({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validateOnChange: false,
        validateOnBlur: false,
        validationSchema: schemaValidation,
        onSubmit: () => {},
    });
    const useAuthContextApi = useContext(AuthContextApi);
    const useUsersContextApi = useContext(UsersContextApi);

    async function onSignUp() {
        const values = formik.values;
        const errors = await formik.validateForm();
        if (Object.keys(errors).length) {
            return;
        }

        formik.setSubmitting(true);

        useAuthContextApi?.registration(values.email, values.password)
            .then(async (data) => {
                const user = {
                    id: data.user!.uid,
                    email: values.email,
                };
                await useUsersContextApi?.addUser(user);

                const userData: IUser= {
                    email: values.email,
                };
                dispatch(UserActions.setUser(userData));
                dispatch(AuthActions.authSuccess());
                
                message.success('You signed up successfully');
            })
            .catch((error) => {

                if (error && error.message) {
                    message.error({
                        content: error.message,
                        duration: 5
                    });
                } else {
                    message.error('Error, please try to sign up again');
                }

                formik.setSubmitting(false);

                console.log(error);
            });
    }

    function onSignIn() {
        history.push(Routes.SIGN_IN);
    }


    return (
        <SignUpForm
            errors={formik.errors}
            values={formik.values}
            isLoading={formik.isSubmitting}
            handleField={formik.handleChange}
            onSignIn={onSignIn}
            onSignUp={onSignUp}
        />
    );
}