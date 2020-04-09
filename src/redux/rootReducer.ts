/* eslint-disable @typescript-eslint/no-namespace */
import { combineReducers } from 'redux';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { authReducer } from './auth/reducer';
import { IUser } from "types/user";
import { IAuth } from "types/auth";
import { userReducer } from "./user/reducer";
import { projectsReducer, IProjectsReducer } from "./projects/reducer";
import { IUsersReducer, usersReducer } from "./users/reducer";

export interface IRootReducer {
    router: RouterState;
    authReducer: IAuth;
    userReducer: IUser;
    usersReducer: IUsersReducer;
    projectsReducer: IProjectsReducer;
}

export const useTypedSelector: TypedUseSelectorHook<IRootReducer> = useSelector;

const rootReducer = (history: History) => combineReducers<IRootReducer>({
    router: connectRouter(history),
    authReducer: authReducer as any,
    userReducer: userReducer as any,
    usersReducer: usersReducer as any,
    projectsReducer: projectsReducer as any
});

export default rootReducer;