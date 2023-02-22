import React from "react";
import { Badge } from "reactstrap";

export const getIsInvoiceGeneratedBadge = (isInvoiceEmpty) => {
  return isInvoiceEmpty ? (
    <Badge color="danger">No</Badge>
  ) : (
    <Badge color="success">Yes</Badge>
  );
};
