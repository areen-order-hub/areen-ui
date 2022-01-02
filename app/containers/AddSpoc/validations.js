import * as yup from "yup";

export default yup.object().shape({
  officeAddress: yup.string(),
  designation: yup.string(),
  phoneNumber: yup.string(),
  spocEmail: yup
    .string()
    .required("Email cannot be empty")
    .email("Invalid email"),
  name: yup.string().required("SPOC Name cannot be empty"),
});
