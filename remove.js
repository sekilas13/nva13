const fs = require("fs");
const path = require("path");

const uploads = path.resolve("public/uploads");

fs.readdir(uploads, (err, files) => {
  const list = files.filter((x) => x.includes("gambarPaslon"));

  if (list) list.forEach((file) => fs.unlinkSync(path.join(uploads, file)));
});
