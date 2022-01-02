const path = require('path');

// import .env variables
require('dotenv-safe').config({
  path: path.join(__dirname, '../.env'),
  allowEmptyValues: true,
});

module.exports = {
    mongo: {
        url: process.env.MONGO_URI,
        collection: process.env.MONGO_COLLECTION
    },
    sessionTimeout: parseFloat(process.env.SESSION_TIME_OUT || '24', 10),
    api: {
        baseUrl: process.env.API_URL,
    },
    oAuthConfig: {
        google: process.env.GOOGLE_CLIENT_KEY || null,
        facebook: process.env.FACEBOOK_APP_ID || null,
    }
}