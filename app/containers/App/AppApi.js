import Request from "utils/request";

export const GetRoles = async() => {
    return await Request({
      url: `/api/appData/roles`,
      method: "GET"
    });
  }
  
  export const GetSkills = async() => {
    return await Request({
      url: `/api/appData/skills`,
      method: "GET"
    });
  }


  export const downloadFile = async (email) => { 
    return await Request({
      url: `/api/file/download/profile/${email}`,
      method: "GET"    
    });
  };