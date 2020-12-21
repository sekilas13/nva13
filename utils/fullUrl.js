/**
 * Function untuk mendapatkan full Url
 * @module express
 * @function fullUrl
 * @param {object} req Express Request Type
 * @return String
 */
module.exports = (req) =>
  req.protocol + "://" + req.get("host") + req.originalUrl;
