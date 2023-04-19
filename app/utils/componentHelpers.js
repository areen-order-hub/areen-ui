import React from "react";
import { Badge } from "reactstrap";

export const getIsInvoiceGeneratedBadge = (isInvoiceEmpty) => {
  return isInvoiceEmpty ? (
    <Badge color="danger">No</Badge>
  ) : (
    <Badge color="success">Yes</Badge>
  );
};

export const getPaymentModeBadge = (paymentMode) => {
  return paymentMode === "Prepaid" ? (
    <Badge color="success">Prepaid</Badge>
  ) : (
    <Badge color="primary">COD</Badge>
  );
};

export const getCarrierStatusBadge = (carrierStatus) => {
  switch (carrierStatus) {
    case "AWB Generated":
      return <Badge>AWB Generated</Badge>;
    case "APPROVED":
    case "Out for Delivery":
      return <Badge color="primary">{carrierStatus}</Badge>;
    case "Shipment cancelled":
    case "Returned":
      return <Badge color="danger">{carrierStatus}</Badge>;
    case "Delivered":
      return <Badge color="success">Delivered</Badge>;
    default:
      return carrierStatus || "N/A";
  }
};
