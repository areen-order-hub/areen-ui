export const filterSpocs = (spocs, userRole, userId) => {
  if (userRole == "admin") return spocs;
  else return spocs.filter((spoc) => spoc.accHolder._id == userId);
};

export const filterPositions = (positions, userId, userRole) => {
  if (userRole === "admin") return positions;
  else
    return positions.filter(
      ({ addedBy, clientId, recruiterAssigned, spocId }) =>
        addedBy === userId ||
        clientId.superAccHolder === userId ||
        recruiterAssigned._id === userId ||
        spocId.accHolder._id === userId
    );
};
