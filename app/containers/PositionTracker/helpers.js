import { parseDate } from "utils/dateTimeHelpers";

export const getFieldData = (field, data) => {
  switch (field) {
    case "dateOfBirth":
      return parseDate(data[field], "DD MMM YYYY");
    case "qualification":
      let qualification = "";
      data[field].forEach(
        ({ degree, institution, passedOutYear, percentage }, index) => {
          qualification += `${index +
            1}) ${degree} - ${institution} - ${passedOutYear} - ${percentage}\n`;
        }
      );
      return qualification;
    case "yearsOfExperience":
      return `${data[field].split(".")[0]}Y ${data[field].split(".")[1]}M`;
    case "presentCTC":
      return `${data[field]} ${data["presentCTCRemarks"]}`;
    case "expectedCTC":
      return `${data[field]} ${data["expectedCTCRemarks"]}`;
    case "noticePeriod":
      return `${data[field]} ${data["noticePeriodRemarks"]}`;
    case "experiences":
      let experience = "";
      data[field].forEach(
        ({ companyName, designation, employmentPeriod }, index) => {
          experience += `${index +
            1}) ${designation} - ${companyName} - ${employmentPeriod}\n`;
        }
      );
      return experience;
    case "consultantAssessment":
      let assessmentStr = "";
      data[field].forEach((assessment, index) => {
        assessmentStr += `${index + 1}) ${assessment}\n`;
      });
      return assessmentStr;
    case "joiningDate":
      return data[field] ? parseDate(data[field], "DD MMM YYYY") : "NA";
    default:
      return data[field];
  }
};
