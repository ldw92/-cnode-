const userModel = require('../model/userModel');
var emailTest = require("../config/email_config.js");
const multer = require('multer');
const path = require('path');
const uploadImg = require('../config/multer_config.js');
const resizeImg = require('../config/gm_config.js');

var obj = {};
obj.reg = function(req, res, next) {
  res.render("home/reg");
};
obj.doreg = function(req, res, next) {
  var con = {
    uname: req.body.uname
  };
  console.log(req.body);
  userModel.findOne(con, function(err, data) {
    if (data) {
      req.flash("errMsg", "用户名重复，请重新输入");
      res.redirect("/users/reg");
      return;

    } else {
      if (req.body.pwdtest === req.body.upwd) {

        userModel.create(req.body, function(err, info) {
          if (err) {
            console.log(err);return;
          }
          console.log(info);
          req.session.user = info;
          res.redirect("/");
          return;
        })
      } else {
        req.flash("errMsgs", "密码不一致,请重新输入");
        res.redirect("/users/reg");
        return;
      }
    }
  })
}
obj.active = function(req, res) {
  res.render("home/active", {
    info: "验证邮件已经发送"
  })
}
obj.activeok = function(req, res) {
  var con = {
    _id: req.params.id
  }
  userModel.update(con, {
    $set: {
      active: 1
    }
  }, function(err) {
    if (err) {
      console.log(err);return
    }
  })
  res.redirect("/users/login");
}
obj.login = function(req, res) {
  res.render("home/login");
}
obj.dologin = function(req, res) {

  var con = {
    uname: req.body.name
  };

  userModel.find(con, function(err, data) {
    if (data.length === 0) {
      req.flash("errMsg", "用户名错误，请重新输入");
      res.redirect("/users/login");

      return;

    } else {
      if (data[0].upwd === req.body.upwd) {
        req.session.user = data[0];
        res.redirect("/");
        return;
      } else {
        req.flash("errMsg", "密码错误");
        res.redirect("/users/login");
        return;
      }

    }
  })
}
obj.setting = function(req, res) {
  res.render("home/setting");
}
obj.dosetting = function(req, res) {
  var con = {
    _id: req.session.user._id
  };
  var loadImg = uploadImg("./upload", "upload_file");
  loadImg(req, res, function(err, info) {
    if (err) {
      switch (err.code) {
        case "文件类型不匹配":
          req.flash("errMsg", "密码错误");
          res.redirect("/users/setting");
          return;
          break;
      }
    }
    var newData = {
      mark: req.body.mark
    };
    if (req.file) {
      resizeImg("./upload/" + req.file.filename, "./public/img/" + req.file.filename, 120, 120, function(err) {
        if (!err) {
          console.log("压缩成功");
          newData.userpic = req.file.filename;
          userModel.update(con, newData, function(err, info) {
            if (!err) {
              userModel.findOne(con, function(err, data) {
                req.session.user = data;
                res.redirect("back");
              })
            }
          });
        }
      })
    } else {
      userModel.update(con, newData, function(err, data) {
        if (!err) {
          userModel.findOne(con, function(err, data) {
            req.session.user = data;
            res.redirect("back");
          })
        }
      })
    }
  })

}
obj.exit = function(req, res) {
  req.session.user = null;
  res.redirect('/');
}
obj.dochange = function(req, res) {
  var con = {
    _id: req.session.user._id
  };
  var data = {
    oldpwd: req.body.oldpwd,
    newpwd: req.body.newpwd
  };
  if (data.oldpwd === req.session.user.upwd) {

    userModel.update(con, {
      $set: {
        upwd: data.newpwd
      }
    }, function(err, info) {
      if (!err) {
        userModel.findOne(con, function(err, info) {
          console.log(info);
          req.session.user.upwd = data.newpwd;
          req.flash("errMsgs", "密码更改成功");
          res.redirect("back");
        })
      }
      console.log(info);
    })
  } else {
    req.flash("errMsg", "密码错误");
    res.redirect("back");
  }

}
module.exports = obj;
