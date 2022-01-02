const Request = require("../utils/request");
var FormData = require('form-data');

exports.UploadFile = async (req, res) => {
  try {
    const { email,path } = req.params;
     
    const { buffer, originalname: filename ,mimetype:contentType  } = req.file;
    let formData = new FormData();    
    const url =  `/v1/file/upload/${path}/${email}`;
    formData.append('file',buffer,{filename,contentType});        
    let formDataHeaders = formData.getHeaders();
    let headers = Object.assign({},req.headers,formDataHeaders);    
    const response = await Request({
      url,
      data: formData,
      method: "POST"
    }, headers);    
    res.json(response);
  }
  catch (err) {
    console.log('Error-----', err)
    res.status(err.status).json(err.message);
  }
}


exports.GetFileUrl = async (req, res) => {
  try {
    const { email,path } = req.params;  
    const url =  `/v1/file/getSingedUrl/${path}/${email}`;
    let headers = req.headers;    
    const response = await Request({
      url,      
      method: "GET"
    }, headers);    
    res.json(response);
  }
  catch (err) {
    console.log('Error-----', err)
    res.status(err.status).json(err.message);
  }
}