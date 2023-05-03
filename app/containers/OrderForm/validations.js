import * as yup from "yup";

export default yup.object().shape({
  shopifyOrderItems: yup.array().of(
    yup.object().shape({
      // title: yup.string().required("Title is required"),
      quantity: yup
        .number()
        .min(1)
        .required("Quantity is required")
        .typeError("Quantity must be a number"),
      price: yup
        .number()
        .min(1)
        .required("Price is required")
        .typeError("Price must be a number"),
      sku: yup.string().required("SKU is required"),
    })
  ),
  // shippingAddress: yup
  //   .object()
  //   .shape({
  //     zip: yup.string().required("Zip is required"),
  //     phone: yup.string().required("Phone is required"),
  //     country: yup.string().required("Country is required"),
  //     province: yup.string().required("Province is required"),
  //     city: yup.string().required("City is required"),
  //     address1: yup.string().required("Address is required"),
  //     name: yup.string().required("Name is required"),
  //   })
  //   .required("Shipping Address is required"),
  // weight: yup
  //   .number()
  //   .required("Weight is required")
  //   .typeError("Weight must be a number"),
  shopifyPrice: yup
    .number()
    .required("Price is required")
    .typeError("Price must be a number"),
  shopifyOrderName: yup.string().required("Order ID is required"),
  shopifyOrderDate: yup
    .number()
    .required("Order Date is required")
    .typeError("Date not valid"),
  paymentMode: yup.string().required("Payment Mode is required"),
  // customerName: yup.string().required("Customer Name is required"),
  bulkStoreName: yup.string().required("Name is required"),
  bulkStoreAlias: yup.string().required("Alias is required"),
});
