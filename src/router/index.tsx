import React, { Suspense, useMemo } from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'redux/store';
import { useTypedSelector } from 'redux/rootReducer';
import { PrivateRoute } from "hoc/PrivateRoute";
import { Layout } from 'antd';
import { Fallback } from "components/Common/Fallback/Fallback";
import { Routes } from "constants/routes";
import { HeaderContainer } from "containers/HeaderContainer/HeaderContainer";
import { SignIn } from "pages/Auth/SignIn/SignIn";
import { SignUp } from "pages/Auth/SignUp/SignUp";
import { ResetPassword } from "pages/Auth/ResetPassword/ResetPassword";
import { LogOut } from "pages/Auth/LogOut/LogOut";

const { Content } = Layout;
const Projects = React.lazy(() => import('pages/Main/Projects/Projects'));
const Project = React.lazy(() => import('pages/Main/Project/Project'));
const Statistic = React.lazy(() => import('pages/Main/Statistic/Statistic'));

function MainRouter() {
    const auth = useTypedSelector(state => state.authReducer);

    const routes = useMemo(() => {
        let content = (
            <Switch>
                <Route path={Routes.SIGN_IN} component={SignIn} />
                <Route path={Routes.SIGN_UP} component={SignUp} />
                <Route path={Routes.RESET_PASS} component={ResetPassword} />
                <Redirect to={Routes.SIGN_IN} />
            </Switch>
        );

        if (auth && auth.refreshToken) {
            content = (
                <Switch>
                    <PrivateRoute exact path={Routes.PROJECTS} component={Projects} />
                    <PrivateRoute path={Routes.PROJECT} component={Project} />
                    <PrivateRoute path={Routes.STATISTIC} component={Statistic} />
                    <PrivateRoute path={Routes.LOG_OUT} component={LogOut} />
                    <Redirect to={Routes.PROJECTS} />
                </Switch>
            );
        }

        return content;
    }, [auth]);


    return (
        <ConnectedRouter history={history}>
                <Layout className="main-layout">
                    <HeaderContainer />
                    <Content className="main-content">
                        <Suspense fallback={<Fallback />}>
                                { routes }
                        </Suspense>
                    </Content>
                </Layout>
        </ConnectedRouter>
    );
}

export default hot(MainRouter);