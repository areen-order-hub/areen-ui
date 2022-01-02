export const shapeAvailableUsers = (users = []) => {
  let availableUsers = users.map((user) => {
    return { value: user.id, label: user.name };
  });
  return availableUsers;
};
