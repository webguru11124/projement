import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children, ...rest }) => (
    <Route
        {...rest}
        render={({ location }) =>
            DJ_CONST.user ? (
                children
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        search: `?next=${location.pathname}`,
                    }}
                />
            )
        }
    />
);

PrivateRoute.propTypes = {
    children: PropTypes.node,
};

export default PrivateRoute;
