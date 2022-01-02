import * as yup from "yup";

export default yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Phone Number must be a number"),
  email: yup
    .string()
    .required("Email cannot be empty")
    .email("Invalid email"),
  name: yup.string().required("Recruiter Name cannot be empty"),
});
