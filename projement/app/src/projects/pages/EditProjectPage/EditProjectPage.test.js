import React from 'react';
import { wait, fireEvent } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { Route } from 'react-router-dom';

import { renderWithContext } from 'core/testUtils';
import { EditProjectPage } from 'projects/pages';
import { getMockProject } from 'projects/testUtils';

describe('EditProjectPage', () => {
    /**
     * Utility to render the page. This could return some helper function like
     * `fillForm` or `submitForm`.
     */
    const renderPage = () => {
        const rtlUtils = renderWithContext(
            // Need the Route component here in order to get the URL param
            // matching to work
            <Route exact path="/projects/:id" component={EditProjectPage} />,
            { route: '/projects/1' },
        );

        return {
            ...rtlUtils,
        };
    };

    beforeEach(() => {
        fetchMock.reset();
    });

    it('sends an API request to the server when the form is submitted', async () => {
        const NEW_ACTUAL_DESIGN = 1.2;

        // Mock the API request to fetch the projects
        fetchMock.getOnce('/api/projects', [getMockProject()]);
        // And the API request to update the given project with the new
        // actual_design value
        fetchMock.putOnce(
            '/api/projects/1/add_actual/',
            getMockProject({ actual_design: NEW_ACTUAL_DESIGN }),
        );

        const {
            history,
            getByLabelText,
            getByText,
            getByTestId,
        } = renderPage();

        // There should be a loading indicator since we're fetching the
        // projects
        expect(getByTestId('spinner')).toBeInTheDocument();
        await wait();

        // Make a small change and submit the form
        fireEvent.change(getByLabelText(/actual design hours/i), {
            target: { value: NEW_ACTUAL_DESIGN },
        });
        fireEvent.click(getByText(/update/i));
        await wait();

        // Expect the correct parameters to have been sent to the server
        expect(fetchMock.calls()[1][1].body).toEqual(
            JSON.stringify({
                actual_design: 1.2,
                actual_development: 0,
                actual_testing: 0,
            }),
        );

        // Redirect to projects' list view after submitting
        expect(history.location.pathname).toBe('/dashboard');
        // Cleanup after all tests
    });

    it('shows validation errors from the server', async () => {
        fetchMock.getOnce('/api/projects', [getMockProject()]);
        // Mock the PUT request to return some validation errors in the DRF
        // format
        fetchMock.putOnce('/api/projects/1/add_actual/', {
            status: 400,
            body: { actual_design: ['It is bad!'] },
        });

        const { getByText } = renderPage();
        await wait();

        fireEvent.click(getByText(/update/i));
        await wait();

        // Shows the validation error to the user
        expect(getByText(/it is bad!/i)).toBeInTheDocument();
        // Cleanup after all tests
    });
});
