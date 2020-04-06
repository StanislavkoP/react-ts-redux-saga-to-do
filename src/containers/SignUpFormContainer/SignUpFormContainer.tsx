import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import firebase from 'firebase/app';
import { message } from "antd";
import { IUser } from 'types';
import { UserActions } from "redux/user/actions";
import { AuthActions } from 'redux/auth/actions';
import { SignUpForm } from "components/SignUpForm/SignUpForm";

interface ISignUpFormContainer {}

function SignUpFormContainer({}: ISignUpFormContainer) {
    const dispatch = useDispatch();
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: onFinish
    });

    function onFinish({email, password }: { email: string, password: string  }) {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((data) => {
                console.log(data)
                const userData: IUser= {
                    email: email
                };
                message.success('You signed up successfully');
                dispatch(UserActions.setUser(userData));
                dispatch(AuthActions.authSuccess());
                history.push('/')

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
            })
    }

    return (
        <SignUpForm
            onFinish={formik.submitForm}
            values={formik.values}
            handleField={formik.handleChange}
            isLoading={formik.isSubmitting}
        />
    );
}


export default SignUpFormContainer;