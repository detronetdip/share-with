const File = require("../models/fileModel");
function view_files(app) {
  app.get("/file/view/:id", async (req, res) => {
    const token = req.params.id;
    const result = await File.findOne({ token: token });
    if (!result) {
      res.render('view_file',{STATUS_CODE:404});
    } else {
      res.render('view_file',{FILE_NAME:result.name,FILE_SIZE:parseInt(result.size/1024)+"KB",ID:result.token});
    }
  });
}
module.exports = view_files;
