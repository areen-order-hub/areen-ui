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
  return financialStatus === "Prepaid" ? (
    <Badge color="success">Prepaid</Badge>
  ) : (
    <Badge color="danger">COD</Badge>
  );
};

export const getFulfillmentStatusBadge = (fulfillmentStatus) => {
  return fulfillmentStatus === "fulfilled" ? (
    <Badge color="success">Fulfilled</Badge>
  ) : (
    <Badge color="warning">Unfulfilled</Badge>
  );
};

export const getCarrierStatusBadge = (carrierStatus) => {
  switch (carrierStatus) {
    case "AWB Generated":
      return <Badge>AWB Generated</Badge>;
    default:
      return "N/A";
  }
};
