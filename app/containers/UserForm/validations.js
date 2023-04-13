import * as yup from "yup";

export default yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Email is required"),
  name: yup.string().required("Name is required"),
});
