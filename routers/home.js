function view_files(app) {
  app.get("/", async (req, res) => {
    res.render('index');
  });
}
module.exports = view_files;
