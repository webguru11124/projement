import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationComponent = ({
    currentPage,
    totalCounts,
    pageSize,
    handlePageChange,
    maxButtons,
}) => {
    const totalPages = Math.ceil(totalCounts / pageSize);

    const renderPaginationItems = () => {
        const paginationItems = [];
        const middleButtonCount = maxButtons; // Subtracting first, prev, next, and last buttons

        // First and prev buttons
        paginationItems.push(
            <PaginationItem key="first" disabled={currentPage === 1}>
                <PaginationLink first onClick={() => handlePageChange(1)} />
            </PaginationItem>
        );
        paginationItems.push(
            <PaginationItem key="prev" disabled={currentPage === 1}>
                <PaginationLink previous onClick={() => handlePageChange(currentPage - 1)} />
            </PaginationItem>
        );

        // Middle buttons
        let startButton = Math.max(1, currentPage - Math.floor(middleButtonCount / 2));
        let endButton = Math.min(totalPages, startButton + middleButtonCount - 1);

        if (endButton - startButton < middleButtonCount - 1) {
            startButton = Math.max(1, endButton - middleButtonCount + 1);
        }

        for (let i = startButton; i <= endButton; i++) {
            paginationItems.push(
                <PaginationItem key={i} active={i === currentPage}>
                    <PaginationLink onClick={() => handlePageChange(i)}>{i}</PaginationLink>
                </PaginationItem>
            );
        }

        // Next and last buttons
        paginationItems.push(
            <PaginationItem key="next" disabled={currentPage === totalPages}>
                <PaginationLink next onClick={() => handlePageChange(currentPage + 1)} />
            </PaginationItem>
        );
        paginationItems.push(
            <PaginationItem key="last" disabled={currentPage === totalPages}>
                <PaginationLink last onClick={() => handlePageChange(totalPages)} />
            </PaginationItem>
        );

        return paginationItems;
    };

    return (
        <div className='d-flex justify-content-center'>
            <Pagination aria-label="Page navigation" >
                {renderPaginationItems()}
            </Pagination>
        </div>
    );
};

export default PaginationComponent;
