import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from "components/Header/Header";

export function HeaderContainer() {
    const location = useLocation();

    return (
        <Header path={location.pathname}/>
    );
}