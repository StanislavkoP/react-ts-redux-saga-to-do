import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useTypedSelector } from "redux/rootReducer";
import { history } from "redux/store";

interface IPrivateRoute {
    exact?: boolean;
    path: string;
    component: React.ComponentType<any>;
}

export function PrivateRoute({ component: Component, ...otherProps }: IPrivateRoute) {
    const auth = useTypedSelector(state => state.authReducer);

    useEffect(() => {
        if(!auth || !auth.refreshToken) {
            history.replace('/signin')
        }
    }, [auth]);


    return <Route {...otherProps} render={(...props) => <Component {...props} />} />;
}