import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTypedSelector } from "redux/rootReducer";
import { Header } from "components/Header/Header";

export function HeaderContainer() {
    const currentUser = useTypedSelector(state => state.userReducer);
    const auth = useTypedSelector(state => state.authReducer);
    const location = useLocation();

    if (!auth) return null;

    return (
        <Header path={location.pathname} userName={currentUser && currentUser.email} />
    );
}