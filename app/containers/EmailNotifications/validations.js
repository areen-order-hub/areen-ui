import * as yup from "yup";

const emailSchema = yup
  .string()
  .email()
  .required();

export default yup.object().shape({
  orderComments: yup.array().of(emailSchema),
  notDeliveredOrders: yup.array().of(emailSchema),
  notInvoicedOrders: yup.array().of(emailSchema),
});
