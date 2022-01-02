import * as yup from "yup";

export default yup.object().shape({
  confirmPassword: yup
    .string()
    .required("Confirm Password cannot be empty")
    .min(6, "Confirm password must be atleast 6 characters"),
  password: yup
    .string()
    .required("Password cannot be empty")
    .min(6, "Password must be atleast 6 characters long"),
});
