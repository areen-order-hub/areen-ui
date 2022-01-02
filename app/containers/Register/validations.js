import * as yup from "yup";

export const formSchema = yup.object().shape({
  orgName: yup
    .string("Organization name is not valid")
    .required("Organization name cannot be empty"),
  password: yup
    .string()
    .required("Password cannot be empty")
    .min(6, "Password must be atleast 6 characters long"),
  email: yup
    .string("Email is not valid")
    .required("Email address is empty")
    .email("Email is not valid"),
  name: yup.string("Name is not valid").required("Name cannot be empty"),
});

export const emailCodeSchema = yup.object().shape({
  code: yup
    .number("Code is not valid")
    .required("Code cannot be empty")
    .min(100000, "Code must be six digits")
    .max(999999, "Code must be six digits"),
});
