import React from 'react';
import { Spinner as BaseSpinner } from 'reactstrap';

const Spinner = () => (
    <div
        className="d-flex justify-content-center align-items-center"
        data-testid="spinner"
    >
        <BaseSpinner type="grow" color="primary" />
    </div>
);

export default Spinner;
