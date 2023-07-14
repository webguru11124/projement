import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';
import { connect } from 'react-redux';

import { EditProjectForm } from 'projects/forms';
import {
    getProjects,
    fetchProjects,
    updateProject,
} from 'projects/ducks/projects';
import { projectType } from 'projects/propTypes';
import { Spinner } from 'core';

const EditProjectPage = ({ projects, fetchProjects, updateProject }) => {
    const { id } = useParams();
    const history = useHistory();
    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    if (!projects.length) {
        return <Spinner />;
    }

    const project = projects.find(project => project.id == id);

    return (
        <Card color="light">
            <CardBody>
                <EditProjectForm
                    project={project}
                    onSubmit={async (values, formikHelpers) => {
                        try {
                            await updateProject(id, values);
                        } catch (errors) {
                            return Object.entries(errors).forEach(
                                ([field, error]) => {
                                    formikHelpers.setFieldError(
                                        field,
                                        error[0],
                                    );
                                },
                            );
                        }

                        formikHelpers.setSubmitting(false);

                        history.push('/dashboard');
                    }}
                />
            </CardBody>
        </Card>
    );
};

EditProjectPage.propTypes = {
    projects: PropTypes.arrayOf(projectType).isRequired,
    fetchProjects: PropTypes.func.isRequired,
    updateProject: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    projects: getProjects(state),
});

const mapDispatchToProps = dispatch => ({
    fetchProjects: () => dispatch(fetchProjects()),
    updateProject: (id, project) => dispatch(updateProject(id, project)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectPage);
