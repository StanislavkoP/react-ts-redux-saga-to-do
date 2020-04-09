import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { AuthActions } from "redux/auth/actions";
import { AuthApi } from "Api/AuthApi";
import { LoadingOutlined } from '@ant-design/icons';
import { message, Spin } from "antd";

export function LogOut() {
    const dispatch = useDispatch();

    useEffect(() => {
        async function signOut() {
            try {
                await  AuthApi.logOut();

                dispatch(AuthActions.logOut());

            } catch (err) {
                if (err && err.message) {
                    message.error('Error, please try again');
                }
            }

        }
        signOut();

    }, []);


    return (
        <Spin className='logout-page__content-spin' indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} tip="Loading..." />
    );
}