import React from "react";
import { Badge } from "reactstrap";

export const getIsInvoiceGeneratedBadge = (isInvoiceEmpty) => {
  return isInvoiceEmpty ? (
    <Badge color="danger">No</Badge>
  ) : (
    <Badge color="success">Yes</Badge>
  );
};

export const getFinancialStatusBadge = (financialStatus) => {
  return financialStatus === "paid" ? (
    <Badge color="success">Paid</Badge>
  ) : (
    <Badge color="danger">Pending</Badge>
  );
};

export const getFulfillmentStatusBadge = (fulfillmentStatus) => {
  return fulfillmentStatus === "fulfilled" ? (
    <Badge color="success">Fulfilled</Badge>
  ) : (
    <Badge color="warning">Unfulfilled</Badge>
  );
};
