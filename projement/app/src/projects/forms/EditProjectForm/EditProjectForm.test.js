import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import { getMockProject } from 'projects/testUtils';
import EditProjectForm from './EditProjectForm';

describe('EditProjectForm', () => {
    /**
     * Helper function to render the form and return some useful utilities (for
     * example, for filling or submitting the form).
     */
    const renderForm = (initialData = {}) => {
        const mockOnSubmit = jest.fn();
        const rtlUtils = render(
            <EditProjectForm
                project={getMockProject(initialData)}
                onSubmit={mockOnSubmit}
            />,
        );

        const fillField = (label, value) => {
            fireEvent.change(rtlUtils.getByLabelText(label), {
                target: { value },
            });
        };

        const submit = () => fireEvent.click(rtlUtils.getByText(/update/i));

        return {
            ...rtlUtils,
            mockOnSubmit,
            fillField,
            submit,
        };
    };

    it('allows the form to be submitted', async () => {
        const { fillField, submit, mockOnSubmit } = renderForm();

        fillField(/actual design hours/i, 4);
        fillField(/actual development hours/i, 5);
        fillField(/actual testing hours/i, 6);
        submit();

        await wait(() => {
            expect(mockOnSubmit).toHaveBeenCalled();
        });

        expect(mockOnSubmit.mock.calls[0][0]).toEqual({
            actual_design: 4,
            actual_development: 5,
            actual_testing: 6,
        });
    });

    it('requires actual design hours to be set', async () => {
        const { mockOnSubmit, submit, getByText, fillField } = renderForm();

        fillField(/actual design hours/i, '');
        submit();
        await wait();

        expect(mockOnSubmit).not.toHaveBeenCalled();
        expect(
            getByText(/actual design hours is a required field/i),
        ).toBeInTheDocument();
    });

    it('requires actual development hours to be set', async () => {
        const { mockOnSubmit, submit, fillField } = renderForm();

        fillField(/actual development hours/i, '');
        submit();
        await wait();

        expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('requires actual testing hours to be set', async () => {
        const { mockOnSubmit, submit, fillField } = renderForm();

        fillField(/actual testing hours/i, '');
        submit();
        await wait();

        expect(mockOnSubmit).not.toHaveBeenCalled();
    });
});
