export const getMockProject = ({ ...overrides } = {}) => ({
    id: 1,
    title: 'Test Project',
    start_date: new Date().toString(),
    end_date: null,
    estimated_design: 10,
    actual_design: 1.02,
    estimated_development: 20,
    actual_development: 2.81,
    estimated_testing: 30,
    actual_testing: 3.8,
    company: {
        id: 1,
        name: 'Test Company',
    },
    tags: [
        {
            id: 1,
            name: 'Test Tag',
            color: 'primary',
        },
    ],

    is_over_budget: false,
    has_ended: false,
    total_estimated_hours: 10,
    total_actual_hours: 6.63,
    ...overrides,
});
