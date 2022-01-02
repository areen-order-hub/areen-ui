export const positionStatusOptions = [
  { id: "Open", text: "Open" },
  { id: "Closed by Us", text: "Closed by Us" },
  { id: "Closed by Other Source", text: "Closed by Other Source" },
  { id: "On Hold", text: "On Hold" },
];

export const candidateInitialStatusOptions = [
  { id: "Processed", text: "Processed" },
  { id: "Not Suitable", text: "Not Suitable" },
];

export const candidateProcessedOptions = [
  { id: "Feedback Awaited", text: "Feedback Awaited" },
  { id: "Profile Shortlisted", text: "Profile Shortlisted" },
  { id: "Profile Rejected", text: "Profile Rejected" },
];

export const round1Options = [
  { id: "Shortlisted - 2nd Round", text: "Shortlisted - 2nd Round" },
  { id: "Shortlisted - 3rd Round", text: "Shortlisted - 3rd Round" },
  { id: "Shortlisted - Final Round", text: "Shortlisted - Final Round" },
];

export const round2Options = [
  { id: "Shortlisted - 3rd Round", text: "Shortlisted - 3rd Round" },
  { id: "Shortlisted - Final Round", text: "Shortlisted - Final Round" },
];

export const round3Options = [
  { id: "Shortlisted - Final Round", text: "Shortlisted - Final Round" },
];

export const candidateInterviewOptions = [
  { id: "Selected", text: "Selected" },
  { id: "No Show", text: "No Show" },
  { id: "Interview Rejected", text: "Interview Rejected" },
];

export const candidateSelectedOptions = [{ id: "Offered", text: "Offered" }];

export const candidateOfferOptions = [
  { id: "Offer Accepted", text: "Offer Accepted" },
  { id: "Offer Declined", text: "Offer Declined" },
  { id: "Dropped Out", text: "Dropped Out" },
];

export const candidateAcceptedOptions = [{ id: "Joined", text: "Joined" }];

export const candidateJoinedOptions = [
  { id: "Invoice Raised", text: "Invoice Raised" },
];

export const getCandidateStatusOptions = (currentStatus) => {
  switch (currentStatus) {
    case "Pending":
      return candidateInitialStatusOptions;
    case "Processed":
      return candidateProcessedOptions;
    case "Profile Shortlisted":
      return round1Options;
    case "Scheduled - 1st Round":
      return [...round1Options, ...candidateInterviewOptions];
    case "Shortlisted - 2nd Round":
    case "Scheduled - 2nd Round":
      return [...round2Options, ...candidateInterviewOptions];
    case "Shortlisted - 3rd Round":
    case "Scheduled - 3rd Round":
      return [...round3Options, ...candidateInterviewOptions];
    case "Shortlisted - Final Round":
    case "Scheduled - Final Round":
      return candidateInterviewOptions;
    case "Selected":
      return candidateSelectedOptions;
    case "Offered":
      return candidateOfferOptions;
    case "Offer Accepted":
      return candidateAcceptedOptions;
    case "Joined":
      return candidateJoinedOptions;
  }
};
