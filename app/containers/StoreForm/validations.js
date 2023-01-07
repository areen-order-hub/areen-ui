import * as yup from "yup";

export default yup.object().shape({
  apiAccessToken: yup.string().required("API Access Token is required"),
  shopifyURL: yup.string(),
  alias: yup.string().required("Alias is required"),
  name: yup.string().required("Name is required"),
});
