import * as yup from "yup";

export default yup.object().shape({
  role: yup.string().required("Role is required"),
});
