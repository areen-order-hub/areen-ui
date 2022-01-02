import * as yup from "yup";

export default yup.object().shape({
  round: yup.string().required("Round Cannot be Empty"),
});
