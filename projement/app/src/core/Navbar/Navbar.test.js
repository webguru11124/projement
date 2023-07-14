import React from 'react';

import { renderWithContext } from 'core/testUtils';
import Navbar from './Navbar';

describe('Navbar', () => {
    it('shows a log in link if the user is not logged in', () => {
        const { getByText } = renderWithContext(<Navbar />);

        expect(getByText(/log in/i)).toBeInTheDocument();
    });

    it('shows a log out link if the user is logged in', () => {
        DJ_CONST.user = { email: 'test@dude.ee' };

        const { getByText } = renderWithContext(<Navbar />);

        expect(getByText(/log out/i)).toBeInTheDocument();
    });
});
