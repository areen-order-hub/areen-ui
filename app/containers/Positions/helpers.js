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

export const shapeClientsToDropdown = (clients = []) => {
  return [
    { id: "undefined", text: "All Clients" },
    ...clients.map(({ _id, alias, name }) => ({
      id: _id,
      text: alias || name,
    })),
  ];
};

export const shapeRecruitersToDropdown = (recruiters = []) => {
  return [
    { id: "undefined", text: "All Recruiters" },
    ...recruiters.map(({ id, name }) => ({ id, text: name })),
  ];
};

export const shapeSpocsToDropdown = (spocs = []) => {
  return [
    { id: "undefined", text: "All Spocs" },
    ...spocs.map(({ id, name }) => ({ id, text: name })),
  ];
};
