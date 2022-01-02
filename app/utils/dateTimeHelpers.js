import moment from "moment-timezone";

export const parseDateTime = (dateTime, dateFormat = "L") => {
  const date = moment(dateTime);
  return {
    date: date.format(dateFormat),
    time: date.format("LT"),
  };
};

export const getDayFromNumber = (dayNumber) => {
  switch (dayNumber) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "N/A";
  }
};

export const parseDate = (dateTime, format = "L") => {
  const date = moment(dateTime);
  return date.format(format);
};

export const parseTime = (dateTime, format = "LT") => {
  const date = moment(dateTime);
  return date.format(format);
};

export const disablePastDates = (current) => {
  const yesterday = moment().subtract(1, "day");
  return current.isAfter(yesterday);
};

export const getDifference = (dateTime) => {
  if (moment().isAfter(dateTime)) return 0;
  return moment(dateTime).diff(moment(), "seconds");
};

export const getDurationToToday = (dateTime) => {
  const date = moment(dateTime);
  const durations = ["years", "months", "days", "hours"];
  for (var i = 0; i < durations.length; i++) {
    const duration = moment().diff(date, durations[i]);
    if (duration > 0) {
      return `about ${duration} ${durations[i]} ago`;
    }
  }
  return "a few minutes ago";
};
