import * as yup from "yup";

export default yup.object().shape({
  expectedCTC: yup.number("Expected CTC must be a number"),
  presentCTC: yup.number("Present CTC must be a number"),
  noticePeriod: yup.number("Notice Period must be a number"),
  monthsOfExperience: yup
    .string()
    .matches(/^[0-9]+$/, "No of Months must be a number")
    .test(
      "is-less-than-12",
      "No of months should not be greater than 12",
      (value) => parseInt(value) <= 12
    ),
  yearsOfExperience: yup
    .string()
    .matches(/^[0-9]+$/, "No of Years must be a number"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Phone Number must be a number"),
  candidateEmail: yup
    .string()
    .required("Email cannot be empty")
    .email("Invalid email"),
  name: yup.string().required("Candidate Name cannot be empty"),
});
