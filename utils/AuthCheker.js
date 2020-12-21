/**
 * Function untuk mengecek apakah user sudah login terlebih dahulu
 * @module express
 * @function checkAuthenticated
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/admin/login");
}

/**
 * Function untuk mengecek apakah user belum ada status login
 * @module express
 * @function checkNotAuthenticated
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/admin");
  }
  next();
}

module.exports = {
  checkAuthenticated,
  checkNotAuthenticated,
};
