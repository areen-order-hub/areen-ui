import * as yup from "yup";

export default yup.object().shape({
  gstin: yup
    .string()
    .nullable()
    .transform((v, o) => (o === "" ? null : v))
    .matches(
      /[0-9]{2}[A-Z|a-z]{5}[0-9]{4}[A-Z|a-z][1-9]Z[A-Z|0-9|a-z]/,
      "Enter a valid GSTIN"
    ),
  noOfSiteLocations: yup
    .string()
    .matches(/^[0-9]+$/, "Number of Site Locations must be a number"),
  website: yup.string().url("Invalid Url"),
  industry: yup
    .array()
    .required("Industry is required")
    .min(1),
  officeAddress: yup.string().required("Office Address is required"),
  name: yup.string().required("Name is required"),
});
