import { useEffect } from 'react';

/**
 * Refresh the page if this component is rendered.
 *
 * Bit if a hack, but allows us to declaratively refresh the page after a React
 * Router redirect, for example.
 */
const RefreshPage = () => {
    useEffect(() => {
        window.location.reload();
    });

    return null;
};

export default RefreshPage;
