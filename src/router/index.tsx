import React, {Suspense, useMemo} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'
import { history } from 'redux/store';
import { useTypedSelector } from 'redux/rootReducer';
import PrivateRoute from "hoc/PrivateRoute";
import { HeaderContainer } from "containers/HeaderContainer/HeaderContainer";
import Fallback from 'components/common/fallback';
import { SignIn } from "pages/Auth/SignIn/SignIn";
import { SignUp } from "pages/Auth/SignUp/SignUp";
import {ResetPassword} from "pages/Auth/ResetPassword/ResetPassword";
import { Dashboard } from "../pages/Main/Dashboard/Dashboard";

const HomePage = React.lazy(() => import('pages/home'));

function MainRouter(props: any) {
    const auth = useTypedSelector(state => state.authReducer);

    const routes = useMemo(() => {
        let content = (
            <>
                <Route path='/signin' component={SignIn} />
                <Route path='/signup' component={SignUp} />
                <Route path='/resetpass' component={ResetPassword} />
                <Redirect to='/signin' />
            </>
        );

        if (auth && auth.refreshToken) {
            content = (
                <>
                    <HeaderContainer />
                    <PrivateRoute exact path='/projects' component={Dashboard} />
                    <Redirect to='/projects' />
                </>
            )
        }

        return content;
    }, [auth]);


    return (
        <ConnectedRouter history={history}>
            <Suspense fallback={<Fallback />}>
                <Switch>
                    { routes }
                </Switch>
            </Suspense>
        </ConnectedRouter>
    );
}

export default MainRouter;