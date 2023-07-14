import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';

import { configureStore } from 'core/store';

/**
 * Helper function to render a component inside providers. Returns the React
 * Testing Library utils exactly like `render` does, but also adds some useful
 * things to the returned object.
 *
 * Wraps the component in the following providers:
 * - Redux provider - initial state and store can be overridden with params
 * - React Router provider with a new `memoryHistory` that can be used to set
 *   the router state
 */
export const renderWithContext = (
    ui,
    {
        initialState = undefined,
        store = configureStore(initialState),
        route = undefined,
    } = {},
) => {
    const history = createMemoryHistory();
    if (route) {
        history.push(route);
    }

    return {
        ...render(
            <Provider store={store}>
                <Router history={history}>{ui}</Router>
            </Provider>,
        ),
        store,
        history,
    };
};
