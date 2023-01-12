import { toNumber, isNumber } from "lodash";

const numberFormatter = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
});

const formatNumber = (value) => {
  if (!isNumber(value)) return "N/A";
  return numberFormatter.format(toNumber(value));
};

export default formatNumber;
export { numberFormatter };
