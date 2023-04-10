const Request = require("../utils/request");
const get = require("lodash/get");

exports.list = async (req, res) => {
  try {
    let url = "/v1/users";
    const users = await Request(
      {
        url,
        method: "GET",
      },
      req.headers
    );
    res.json(users);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.paginate = async (req, res) => {
  try {
    const users = await Request(
      {
        url: "/v1/user/paginate",
        method: "GET",
        params: req.query,
      },
      req.headers
    );
    res.json(users);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.GetUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const url = `/v1/users/${userId}`;
    const headers = req.headers;
    var response = await Request(
      {
        url,
        method: "GET",
      },
      headers
    );
    res.json(MapUserData(response));
  } catch (error) {
    console.log(error);
  }
};

const MapUserData = (data) => {
  return {
    firstName: get(data, "firstName", ""),
    lastName: get(data, "lastName", ""),
    email: get(data, "email", ""),
    role: get(data, "role", ""),
    enabled: get(data, "enabled", true),
    phoneNumber: get(data, "phoneNumber", ""),
    userName: get(data, "userName", ""),
    currentRole: get(data, "currentRole", ""),
    currentCompanyName: get(data, "currentCompanyName", ""),
    dashboardPreference: {
      task: get(data, "dashboardPreference.task"),
      event: get(data, "dashboardPreference.event"),
      calendar: get(data, "dashboardPreference.calendar"),
      courseProgress: get(data, "dashboardPreference.courseProgress"),
      popularCourses: get(data, "dashboardPreference.popularCourses"),
      activityFeed: get(data, "dashboardPreference.activityFeed"),
    },
    experience: get(data, "yearsOfExpeirence", ""),
    bio: get(data, "bio", ""),
    openToRoles: get(data, "openToRoles", []),
    otherProfile: {
      websiteUrl: get(data, "otherProfile.websiteUrl", ""),
      linkedInLink: get(data, "otherProfile.linkedInLink", ""),
      twitterLink: get(data, "otherProfile.twitterLink", ""),
      githubLink: get(data, "otherProfile.githubLink", ""),
    },
    collegeInfo: {
      graduationDate: get(data, "collegeInfo.graduationDate", ""),
      university: get(data, "collegeInfo.university", ""),
      major: get(data, "collegeInfo.major", ""),
      degree: get(data, "collegeInfo.degree", ""),
      gpa: get(data, "collegeInfo.gpa", ""),
      max: get(data, "collegeInfo.max", ""),
    },
    companyInfo: {
      companyName: get(data, "companyInfo.companyName", ""),
      title: get(data, "companyInfo.title", ""),
      startDate: get(data, "companyInfo.startDate", ""),
      endDate: get(data, "companyInfo.endDate", ""),
      description: get(data, "companyInfo.description", ""),
      currentWorking: get(data, "companyInfo.currentWorking", false),
    },
    imageUrl: get(data, "picture", ""),
    skills: get(data, "skills", []),
    achievements: get(data, "achievements", ""),
  };
};

const MapUIToAPI = (data) => {
  let obj = {};

  if (data["experience"] != undefined)
    obj["yearsOfExpeirence"] = data["experience"];

  if (data["imageUrl"] != undefined) obj["picture"] = data["imageUrl"];

  return obj;
};

exports.UpdateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const url = `/v1/users/${userId}`;
    const headers = req.headers;
    const mappedData = MapUIToAPI(req.body);
    const data = Object.assign({}, req.body, mappedData);

    var response = await Request(
      {
        url,
        data,
        method: "PATCH",
      },
      headers
    );

    res.json(MapUserData(response));
  } catch (error) {
    console.log(error);
  }
};
