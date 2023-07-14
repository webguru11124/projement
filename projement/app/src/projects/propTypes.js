import PropTypes from 'prop-types';

export const companyType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
});

export const projectType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    company: companyType.isRequired,
    title: PropTypes.string.isRequired,
    start_date: PropTypes.string.isRequired, // YYYY-MM-DD format
    end_date: PropTypes.string,
    estimated_design: PropTypes.number.isRequired,
    actual_design: PropTypes.number.isRequired,
    estimated_development: PropTypes.number.isRequired,
    actual_development: PropTypes.number.isRequired,
    estimated_testing: PropTypes.number.isRequired,
    actual_testing: PropTypes.number.isRequired,

    // Django model properties
    total_estimated_hours: PropTypes.number.isRequired,
    total_actual_hours: PropTypes.number.isRequired,
    has_ended: PropTypes.bool.isRequired,
    is_over_budget: PropTypes.bool.isRequired,
});
