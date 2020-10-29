const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
  // ac.grant("siswa").readOwn("profile").updateOwn("profile");

  // ac.grant("guru").extend("siswa").readAny("profile");

  // ac.grant("admin")
  //   .extend("siswa")
  //   .extend("guru")
  //   .updateAny("profile")
  //   .deleteAny("profile");

  return ac;
})();
