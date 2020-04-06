import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { message } from "antd";
import firebase from "firebase/app";
import {IAuth, IUser} from "types";
import { AuthActions } from 'redux/auth/actions';
import {UserActions} from "redux/user/actions";
import { LocalStorageHelper } from "utils/localStorageHelper";
import { useHistory } from "react-router-dom";
import { SignInForm } from "components/SignInForm/SignInForm";


interface ISignInFormContainer {}

function SignInFormContainer({}: ISignInFormContainer) {
    const dispatch = useDispatch();
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: onFinish
    });



    async function onFinish({email, password }: { email: string, password: string  }) {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((data) => {
                if (!data.user) throw Error('No user information');

                const userData: IUser= {
                    email: email
                };
                const authData: IAuth = {
                    refreshToken: data.user.refreshToken
                };

                dispatch(UserActions.setUser(userData));
                dispatch(AuthActions.authSuccess(authData));
                message.success('You signed in successfully');

            })
            .catch((error) => {

                if (error && error.message) {
                    message.error({
                        content: error.message,
                        duration: 5
                    });
                }

                formik.setSubmitting(false);

                console.log(error)
            });
    }

    return (
        <SignInForm
            onFinish={formik.submitForm}
            values={formik.values}
            handleField={formik.handleChange}
            isLoading={formik.isSubmitting}
        />
    );
}


export default SignInFormContainer;