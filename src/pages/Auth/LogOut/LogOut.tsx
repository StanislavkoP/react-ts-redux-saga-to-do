import React, { useContext, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { AuthActions } from "redux/auth/actions";
import { LoadingOutlined } from '@ant-design/icons';
import { message, Spin } from "antd";
import { AuthContextApi } from "contexts/authContextApi";

export function LogOut() {
    const dispatch = useDispatch();
    const useAuthContextApi = useContext(AuthContextApi);

    useEffect(() => {
        async function signOut() {
            try {
                await  useAuthContextApi?.logOut();

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