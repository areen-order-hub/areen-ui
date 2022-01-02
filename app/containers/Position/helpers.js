export const recruitmentStatusToInterviewRound = (recruitmentStatus) => {
  switch (recruitmentStatus) {
    case "Scheduled - 1st Round":
      return "Round 1";
    case "Scheduled - 2nd Round":
      return "Round 2";
    case "Scheduled - 3rd Round":
      return "Round 3";
    case "Scheduled - Final Round":
      return "Final Round";
    default:
      return null;
  }
};
