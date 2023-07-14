import React from 'react';

import projectReadme from '/README.html';
import backEndReadme from '/BE.html';
import frontEndReadme from '/FE.html';
import { useParams } from 'react-router-dom';

/**
 * A more convenient way to look at the assignment.
 */
const AssignmentPage = () => {
    const { doc } = useParams();

    const readme = {
        Assignment: projectReadme,
        Backend: backEndReadme,
        Frontend: frontEndReadme,
    }[doc];
    if (readme) {
        return (
            <>
                <div
                    className="assignment-content"
                    dangerouslySetInnerHTML={{ __html: readme }}
                />
                <hr />
                <p className="text-right">&copy; Thorgate</p>
            </>
        );
    } else {
        return (
            <div className="alert alert-warning" role="alert">
                Woops, look like that link doesn&apos;t work.
                <br />
                These pages are just for quick reference for the main 3 READMES.
                <br />
                Github renders links to project files correctly.
                <br />
            </div>
        );
    }
};

export default AssignmentPage;
