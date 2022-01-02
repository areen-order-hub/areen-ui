const axios = require('axios');
const _get = require('lodash/get');
const logger = require('../logger');
const { api } = require('../config');

const baseURL = api.baseUrl;

function CustomException(err) {
    return {
        status: _get(err, 'response.status', 500),
        message: _get(err, 'response.data.message', null)
    }
}

module.exports = async function call(config = {}, headers = {}) {
    try {
        const response = await axios.request({
            baseURL,
            headers,
            ...config,
          });
          return response.data;
    }
    catch(err) {
        logger.error(JSON.stringify({
            error: err.message,
            url: `${baseURL}${config.url}`,
            method: config.method,
            data: err.response ? err.response.data : err.response
        }));
        throw new CustomException(err);
    }
  }