export const shapeAvailableUsers = (users = []) => {
    
  let availableUsers = users.map(user => {
    return { id: user.id, text: user.name }
    })
    return availableUsers
};
