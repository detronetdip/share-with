const Files = require("../models/fileModel");
const token = require("idrand");
function files(app) {
  app.post("/api/upload/files", (req, res) => {
    if (!req.files || Object.keys(req.files).length == 0) {
      res.status(400).send("No file provided to upload");
    } else {
      var file = req.files.myfile;
      console.log(file);
      var newName = Date.now() + file.name;
      file.mv("./uploads/" + newName, (err) => {
        if (err) {
          res.send(err);
        } else {
          const f = async () => {
            try {
              const tkn =
                token(5) + "-" + token(8) + "-" + token(5) + "-" + token(20);
              const result = new Files({
                name: newName,
                size: file.size,
                path: "uploads/" + newName,
                token: tkn,
              });
              await result.save();
              await res.status(200).json({
                MESSAGE: "uploaded",
                LINK: process.env.BASE_URL + "file/view/" + tkn,
              });
            } catch (er) {
              res.status(500).send(er);
            }
          };
          f();
        }
      });
    }
  });
}
module.exports = files;
