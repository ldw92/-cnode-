var userModel = require("../model/userModel");
var topicModel = require("../model/topicModel");
var replyModel = require("../model/replyModel");
var Eventproxy = require("eventproxy");
var ep = new Eventproxy();
var obj = {};

obj.index = function(req, res, next) {
  topicModel.find().count(function(err, num) {
    var page = req.query.page ? req.query.page : 1;
    var pageSize = 2;
    var pageMax = Math.ceil(num / pageSize);

    if (page <= 0) {
      page = 1
    }
    if (page >= pageMax) {
      page = pageMax
    }
    var pageOffset = (page - 1) * pageSize;
    topicModel.find({}, {}, {
      sort: {
        reTime: -1
      },
      skip: pageOffset,
      limit: pageSize
    }).populate("uid", {
      userpic: 1,
      uname: 1
    }).populate("lastreplyuser", {
      userpic: 1,
      uname: 1
    }).exec(function(err, data) {
      console.log(data);
      res.render("index", {
        topicData: data,
        page: page,
        pageMax: pageMax
      });
    })

  })

};
module.exports = obj;
