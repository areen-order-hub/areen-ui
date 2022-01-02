import * as yup from "yup";

export default yup.object().shape({
  email: yup
    .string("Email is not valid")
    .required("Email address is empty")
    .email("Email is not valid"),
});
