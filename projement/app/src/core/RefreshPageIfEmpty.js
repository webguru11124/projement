import { useEffect } from 'react';

/**
 * Refresh the page if this component is rendered.
 *
 * Bit if a hack, but allows us to declaratively refresh the page after a React
 * Router redirect, for example.
 */
const RefreshPage = () => {
    useEffect(() => {
        // For some reason even on the client side, the page is empty for a split second. So we need to wait a bit.
        setTimeout(() => {
            if (
                !document.body
                    .querySelector('.ssr-container')
                    ?.textContent.trim()
            ) {
                window.location.reload();
            }
        }, 200);
    });

    return null;
};

export default RefreshPage;
