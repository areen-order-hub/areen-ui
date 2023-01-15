import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

function PaginationDetails({ paginationDetails, onClick }) {
  return (
    <Pagination
      className="d-flex justify-content-end text-end"
      aria-label="Page navigation example"
      size="sm"
    >
      <PaginationItem>
        <PaginationLink first onClick={() => onClick(1)} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          onClick={() => onClick(paginationDetails.prevPage)}
          previous
          {...(paginationDetails.hasPrevPage ? {} : { disabled: true })}
        />
      </PaginationItem>
      {paginationDetails.pageNumbers &&
        paginationDetails.pageNumbers.map((pageNumber) => (
          <PaginationItem active={paginationDetails.page === pageNumber}>
            <PaginationLink onClick={() => onClick(pageNumber)}>
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
      <PaginationItem>
        <PaginationLink
          onClick={() => onClick(paginationDetails.nextPage)}
          next
          {...(paginationDetails.hasNextPage ? {} : { disabled: true })}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          last
          onClick={() => onClick(paginationDetails.totalPages)}
        />
      </PaginationItem>
    </Pagination>
  );
}

export default PaginationDetails;
