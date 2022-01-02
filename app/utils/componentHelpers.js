import React from "react";
import { Badge } from "reactstrap";

export const getRoundBadge = (round) => {
  switch (round) {
    case "Round 1":
      return <Badge>{round}</Badge>;
    case "Round 2":
      return <Badge color="info">{round}</Badge>;
    case "Round 3":
      return <Badge color="primary">{round}</Badge>;
    case "Final Round":
      return <Badge color="success">{round}</Badge>;
  }
};

export const getPositionStatusBadge = (position) => {
  switch (position) {
    case "Open":
      return <Badge color="info">{position}</Badge>;
    case "Closed by Us":
      return <Badge color="success">{position}</Badge>;
    case "Closed by Other Source":
      return <Badge color="warning">{position}</Badge>;
    case "On Hold":
      return (
        <Badge color="dark" className="text-secondary">
          {position}
        </Badge>
      );
  }
};

export const getCandidateStatusBadge = (status) => {
  switch (status) {
    case "Pending":
      return (
        <Badge color="dark" className="text-secondary">
          {status}
        </Badge>
      );
    case "Processed":
      return <Badge color="primary">{status}</Badge>;
    case "Profile Shortlisted":
    case "Shortlisted - 2nd Round":
    case "Shortlisted - 3rd Round":
    case "Shortlisted - Final Round":
    case "Scheduled - 1st Round":
    case "Scheduled - 2nd Round":
    case "Scheduled - 3rd Round":
    case "Scheduled - Final Round":
      return <Badge color="info">{status}</Badge>;
    case "Selected":
    case "Offered":
    case "Offer Accepted":
    case "Joined":
      return <Badge color="success">{status}</Badge>;
    case "Profile Rejected":
    case "Offer Declined":
    case "Dropped Out":
    case "Interview Rejected":
      return <Badge color="danger">{status}</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};
