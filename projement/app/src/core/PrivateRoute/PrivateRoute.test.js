import React from 'react';

import { renderWithContext } from 'core/testUtils';
import PrivateRoute from './PrivateRoute';

describe('PrivateRoute', () => {
    it('renders the children if the user is logged in', () => {
        DJ_CONST.user = { id: 1 };
        const { getByText, history } = renderWithContext(
            <PrivateRoute>Hello</PrivateRoute>,
        );

        // The children are shown
        expect(getByText('Hello')).toBeInTheDocument();
        // The user is not redirected
        expect(history.location.pathname).not.toBe('/login');
    });

    it('redirects the user if they are not logged in', async () => {
        DJ_CONST.user = null;
        const { history, queryByText } = renderWithContext(
            <PrivateRoute>Hello</PrivateRoute>,
        );

        // The children are not shown
        expect(queryByText('Hello')).not.toBeInTheDocument();
        // The user has been redirected to /login
        expect(history.location.pathname).toBe('/login');
    });
});
