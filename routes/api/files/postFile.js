const multipart = include("services/multipartFormParser"),
  fileUploadService = include("services/fileUploadService"),
  uuid = require("node-uuid");

module.exports = function PostFile(req, res) {
  multipart(req, function(err, results) {
    const id = results.Id;
    if (err) {
      console.warn("PostFile.js ln: 8");
      return res.json({
        success: false,
        error: err
      });
    }

		//IDEA: if you are changing image maybe delete old one
    fileUploadService.uploadAttachments("user-files", results.files, function(
      err,
      attachments
    ) {
      if (err) {
        console.warn("PostFile.js ln: 14");
        return res.json({
          success: false,
          error: err
        });
      }

      const file = attachments[0].FileLocation;
      res.json({ success: true, payload: file });
    });
  });
};
