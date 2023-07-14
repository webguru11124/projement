import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { Button, Input, FormGroup, Label, FormFeedback } from 'reactstrap';
import * as Yup from 'yup';

import { projectType } from 'projects/propTypes';

/**
 * Custom form field component to make using Reactstrap and Formik together
 * easier and less verbose.
 */
const FormField = ({ label, name, touched, errors }) => (
    <FormGroup>
        <Label for={name}>{label}</Label>
        <Input
            type="number"
            name={name}
            id={name}
            tag={Field}
            invalid={touched[name] && !!errors[name]}
            min={0}
            required
        />
        {touched[name] && errors[name] && (
            <FormFeedback>{errors[name]}</FormFeedback>
        )}
    </FormGroup>
);

FormField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

/**
 * Form for editing the actual hours for a project.
 */
const EditProjectForm = ({ project, onSubmit }) => (
    <Formik
        initialValues={{
            actual_design: project.actual_design,
            actual_development: project.actual_development,
            actual_testing: project.actual_testing,
        }}
        validationSchema={Yup.object().shape({
            actual_design: Yup.number()
                .min(0)
                .required()
                .label('Actual design hours'),
            actual_development: Yup.number()
                .min(0)
                .required()
                .label('Actual development hours'),
            actual_testing: Yup.number()
                .min(0)
                .required()
                .label('Actual testing hours'),
        })}
        onSubmit={onSubmit}
    >
        {({ touched, errors, isSubmitting }) => (
            <Form>
                <FormField
                    name="actual_design"
                    label="Actual design hours"
                    touched={touched}
                    errors={errors}
                />
                <FormField
                    name="actual_development"
                    label="Actual development hours"
                    touched={touched}
                    errors={errors}
                />
                <FormField
                    name="actual_testing"
                    label="Actual testing hours"
                    touched={touched}
                    errors={errors}
                />
                <Button type="submit" color="primary" disabled={isSubmitting}>
                    UPDATE
                </Button>
            </Form>
        )}
    </Formik>
);

EditProjectForm.propTypes = {
    project: projectType.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default EditProjectForm;
