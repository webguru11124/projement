import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';

import { Spinner } from 'core';
import {
    fetchProjects,
    getProjects,
    getIsLoading,
} from 'projects/ducks/projects';
import { projectType, pageType } from 'projects/propTypes';
import { getPage } from '../../ducks/projects';
import PaginationComponent from '../../../core/component/PaginationComponent';
import ProjectComponent from '../../../core/component/ProjectComponent';

const DashboardPage = ({
    fetchProjects,
    projects,
    isLoading,
    page: { currentPage, pageSize, count },
}) => {
    useEffect(() => {
        fetchProjects(currentPage, pageSize);
    }, [currentPage, fetchProjects, pageSize]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Tags</th>
                        <th>Company</th>
                        <th>Estimated</th>
                        <th>Actual</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project, i) => (
                        <ProjectComponent
                            project={project}
                            key={project.id}
                            index={i}
                        />
                    ))}
                </tbody>
            </Table>
            <PaginationComponent
                currentPage={currentPage}
                totalCounts={count}
                maxButtons={5}
                pageSize={pageSize}
                handlePageChange={page => fetchProjects(page, pageSize)}
            />
        </>
    );
};

DashboardPage.propTypes = {
    fetchProjects: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    page: pageType.isRequired,
    projects: PropTypes.arrayOf(projectType).isRequired,
};

const mapStateToProps = state => ({
    projects: getProjects(state),
    isLoading: getIsLoading(state),
    page: getPage(state),
});

const mapDispatchToProps = dispatch => ({
    fetchProjects: (page, pageSize) => dispatch(fetchProjects(page, pageSize)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
