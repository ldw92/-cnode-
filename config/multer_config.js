const multer = require('multer');
const path = require('path');
const uid = require('uid');
function uploadImg(fileName, savePath) {
  // 文件上传配置
  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, fileName)
    },
    filename: function(req, file, cb) {
      var ext = path.extname(file.originalname);
      cb(null, Date.now() + uid(10) + ext);
    }
  });

  function fileFilter(req, file, cb) {
    var allType = ["image/jpeg", "image/png"];
    if (allType.indexOf(file.mimetype) == -1) {
      // 错误信息
      var err = new Error();
      err.code = "文件类型不匹配";
      cb(err);
      cb(null, false);
    } else {
      console.log("上传成功");

      cb(null, true);
    }
  }

  var upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 1024 * 1024
    }
  }).single(savePath);
  return upload;
}

module.exports = uploadImg;
