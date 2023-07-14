import React from 'react';
import ReactDOM from 'react-dom';
import 'bootswatch/dist/flatly/bootstrap.min.css';

import { App } from './core';

export const init = () => {
    ReactDOM.render(<App />, document.querySelector('#app'));
};
