import React, { Suspense, useMemo } from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'redux/store';
import { useTypedSelector } from 'redux/rootReducer';
import { PrivateRoute } from "hoc/PrivateRoute";
import { Layout } from 'antd';
import Fallback from 'components/common/fallback';
import { GlobalProviderFirebaseDB } from "contexts/firebaseDatabaseContext";
import { GlobalProviderProjectContextApi } from "contexts/projectContextApi";
import { GlobalProviderTaskContextApi } from "contexts/taskContextApi";
import { GlobalProviderAuthContextApi } from "contexts/authContextApi";
import { GlobalProviderUsersContextApi } from "contexts/usersContextApi";
import { HeaderContainer } from "containers/HeaderContainer/HeaderContainer";
import { SignIn } from "pages/Auth/SignIn/SignIn";
import { SignUp } from "pages/Auth/SignUp/SignUp";
import { ResetPassword } from "pages/Auth/ResetPassword/ResetPassword";
import { Projects } from "pages/Main/Projects/Projects";
import { Project } from "pages/Main/Project/Project";
import { LogOut } from "pages/Auth/LogOut/LogOut";
import { Statistic } from "pages/Main/Statistic/Statistic";

const { Content } = Layout;
// const HomePage = React.lazy(() => import('pages/home'));

function MainRouter() {
    const auth = useTypedSelector(state => state.authReducer);

    const routes = useMemo(() => {
        let content = (
            <Switch>
                <Route path='/signin' component={SignIn} />
                <Route path='/signup' component={SignUp} />
                <Route path='/resetpass' component={ResetPassword} />
                <Redirect to='/signin' />
            </Switch>
        );

        if (auth && auth.refreshToken) {
            content = (
                <Switch>
                    <GlobalProviderFirebaseDB>
                        <GlobalProviderProjectContextApi>
                            <GlobalProviderTaskContextApi>
                                <GlobalProviderUsersContextApi>
                                        <PrivateRoute exact path='/' component={Projects} />
                                        <PrivateRoute path='/projects/:id' component={Project} />
                                        <PrivateRoute path='/statistic' component={Statistic} />
                                        <PrivateRoute path='/logout' component={LogOut} />
                                        <Redirect to='/' />
                                </GlobalProviderUsersContextApi>
                            </GlobalProviderTaskContextApi>
                        </GlobalProviderProjectContextApi>
                    </GlobalProviderFirebaseDB>
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
                            <GlobalProviderAuthContextApi>
                                { routes }
                            </GlobalProviderAuthContextApi>
                        </Suspense>
                    </Content>
                </Layout>
        </ConnectedRouter>
    );
}

export default hot(MainRouter);