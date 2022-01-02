const Request = require("../utils/request");
const availableSkills = require("../constants/skills")
const availableRoles = require("../constants/role")

exports.GetRoles = async (req, res) => {
  try {       
    res.json(availableRoles);
  }
  catch (err) {
    console.log('Error-----', err)
    res.status(err.status).json(err.message);
  }
}


exports.GetSkills = async (req, res) => {
  try {    
    res.json(availableSkills);
  }
  catch (err) {
    console.log('Error-----', err)
    res.status(err.status).json(err.message);
  }
}