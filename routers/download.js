const File = require("../models/fileModel");
function view_files(app) {
  app.get("/download/file/:id", async (req, res) => {
    const token = req.params.id;
    const result = await File.findOne({ token: token });
    if (!result) {
      res.render('view_file',{STATUS_CODE:404});
    } else {
      res.download(result.path);
    }
  });
}
module.exports = view_files;
