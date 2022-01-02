export const filterAndShapeClients = (clients = [], userId, userRole) => {
  let filteredClients = [];

  if (userRole === "admin") {
    filteredClients = clients.map(({ id, name: text }) => {
      return {
        id,
        text,
      };
    });
  } else {
    clients.forEach(({ id, name, superAccHolder, spocDetails }) => {
      if (superAccHolder == userId) {
        filteredClients.push({ id, text: name });
      } else if (spocDetails.length !== 0) {
        for (let i = 0; i < spocDetails.length; i++) {
          if (spocDetails[i].accHolder._id == userId) {
            filteredClients.push({ id, text: name });
            break;
          }
        }
      }
    });
  }

  return filteredClients;
};

export const filterAndShapeSpocs = (spocs = [], userId, userRole) => {
  let filteredSpocs = [];
  if (userRole === "admin") {
    filteredSpocs = spocs.map(({ id, name: text }) => {
      return {
        id,
        text,
      };
    });
  } else {
    spocs.forEach(({ id, name: text, accHolder }) => {
      if (accHolder._id == userId) {
        filteredSpocs.push({ id, text });
      }
    });
  }

  return filteredSpocs;
};

export const shapeToDropDown = (data = []) => {
  let dropDownData = data.map(({ id, name: text }) => {
    return { id, text };
  });
  return dropDownData;
};
