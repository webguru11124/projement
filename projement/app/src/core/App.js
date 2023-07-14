import React from 'react';
import { Container } from 'reactstrap';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import { DashboardPage, EditProjectPage } from 'projects/pages';
import { configureStore } from 'core/store';
import { PrivateRoute } from 'core';
import { AssignmentPage } from './pages';
import Navbar from './Navbar';
import RefreshPageIfEmpty from './RefreshPageIfEmpty';

const store = configureStore();

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Navbar />
            <Container>
                <Switch>
                    <PrivateRoute path="/dashboard">
                        <DashboardPage />
                    </PrivateRoute>
                    <PrivateRoute path="/projects/:id">
                        <EditProjectPage />
                    </PrivateRoute>
                    <Route path="/login">
                        {/**
                         * The Login page content is loaded on the server side,
                         * however the navbar & app are all loaded on the client side.
                         * So we need to have a route, but we don't want to render anything else.
                         */}
                        <RefreshPageIfEmpty />
                    </Route>
                    <Route path="/docs/:doc" exact>
                        <AssignmentPage />
                    </Route>
                    <Route
                        path={[
                            '/docs/Backend/app/README.adoc',
                            '/docs/Assignment/projement/app/README.adoc',
                        ]}
                        exact
                    >
                        {/**
                         * This and the following route + redirect are so the links to and from the docs work,
                         * even though the paths are wrong
                         */}
                        <Redirect to={'/docs/Frontend'} />
                    </Route>
                    <Route
                        path={['/docs/Assignment/projement/README.adoc']}
                        exact
                    >
                        <Redirect to={'/docs/Backend'} />
                    </Route>

                    <Route path="/">
                        <Redirect to={'/docs/Assignment'} />
                    </Route>
                </Switch>
            </Container>
        </BrowserRouter>
    </Provider>
);

export default App;
