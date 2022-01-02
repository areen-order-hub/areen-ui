import * as yup from "yup";

export default yup.object().shape({
  maxYearsOfExperience: yup.number("Max. Years of Experience must be a number"),
  minYearsOfExperience: yup.number("Min. Years of Experience must be a number"),
  maxBudget: yup.number("Max. Budget must be a number"),
  minBudget: yup.number("Min. Budget must be a number"),
});
