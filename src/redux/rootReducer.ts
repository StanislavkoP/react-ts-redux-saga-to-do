/* eslint-disable @typescript-eslint/no-namespace */
import { combineReducers } from 'redux';
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { routerReducer } from 'react-router-redux';
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import { authReducer } from './auth/reducer';
import { IUser, IAuth } from "../types";
import { userReducer } from "./user/reducer";
import { projectsReducer, IProjectsReducer } from "./projects/reducer";

export interface IRootReducer {
    router: RouterState,
    authReducer: IAuth,
    userReducer: IUser,
    projectsReducer: IProjectsReducer
}

export const useTypedSelector: TypedUseSelectorHook<IRootReducer> = useSelector;

// NOTE: current type definition of Reducer in 'redux-actions' module
// doesn't go well with redux@4
const rootReducer = (history: History) => combineReducers<IRootReducer>({
    router: connectRouter(history),
    authReducer: authReducer as any,
    userReducer: userReducer as any,
    projectsReducer: projectsReducer as any
});

export default rootReducer;