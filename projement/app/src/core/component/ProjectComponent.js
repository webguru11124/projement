import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';
import { projectType } from 'projects/propTypes';
const ProjectComponent = ({ project, index: i }) => {
    const calculateProjectHasEnded = project => {
        // Get the current date
        return project.has_ended;
    };

    return (
        <tr>
            <td data-testid={`project-title-${i}`}>
                <Link to={`/projects/${project.id}`}>
                    {calculateProjectHasEnded(project) ? (
                        <s>{project.title}</s>
                    ) : (
                        project.title
                    )}
                </Link>
                {project.is_over_budget && (
                    <Badge
                        color="danger"
                        className="ml-2"
                        data-testid="over-budget-badge"
                    >
                        <FontAwesomeIcon icon={faClock} />
                    </Badge>
                )}
            </td>
            <td data-testid={`project-tags-${i}`}>
                {project.tags.map(tag => (
                    <Badge key={tag.id} color={tag.color} className="mr-2">
                        {tag.name}
                    </Badge>
                ))}
            </td>
            <td data-testid={`project-company-name-${i}`}>
                {project.company.name}
            </td>
            <td data-testid={`project-estimated-hours-${i}`}>
                {project.total_estimated_hours}
            </td>
            <td data-testid={`project-actual-hours-${i}`}>
                {project.total_actual_hours}
            </td>
        </tr>
    );
};
ProjectComponent.propTypes = {
    project: projectType.isRequired,
    index: PropTypes.number.isRequired,
};

export default ProjectComponent;
