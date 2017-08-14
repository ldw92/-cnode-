var userModel = require("../model/userModel");
var topicModel = require("../model/topicModel");
var replyModel = require("../model/replyModel");
const Eventproxy = require('eventproxy');
// console.log(Eventproxy);
var ep = new Eventproxy();
var obj = {};
obj.create = function(req, res, next) {
  res.render("home/topicCreate");
};
obj.docreate = function(req, res, next) {
  var con = {
    title: req.body.title,
    content: req.body.content,
    uid: req.session.user._id,
    reTime: Date.now()
  }

  topicModel.create(con, function(err, info) {
    if (err) {
      console.log(err);return
    }
    res.redirect("/topic/show/" + info._id);

  })
};
obj.show = function(req, res, next) {
  var con1 = {
    _id: req.params._id
  };
  var con2 = {
    tid: req.params._id
  };

  ep.all("topicData", "replyData", "views", function(topicData, replyData, views) {
    res.render("home/show", {
      topicData: topicData,
      replyData: replyData
    });
    console.log(topicData, replyData);
  })
  topicModel.find(con1).populate('uid', {
    uname: 1,
    gold: 1,
    userpic: 1,
    mark: 1
  }).exec(function(err, data) {
    ep.emit("topicData", data);
  });

  // 浏览量
  topicModel.update(con1, {
    $inc: {
      visits: 1
    }
  }, function(err) {
    if (err) {
      console.log(err);return;
    }
    ep.emit("views");
  });
  replyModel.find(con2).populate('uid', {
    uname: 1,
    userpic: 1

  }).exec(function(err, data) {
    ep.emit("replyData", data);
  });

};
obj.reply = function(req, res) {
  var con = {
    _id: req.body.tid
  }
  topicModel.findOne(con, {
    reply: 1
  }, function(err, rel) {
    var data = {
      uid: req.session.user._id,
      tid: req.body.tid,
      content: req.body.content,
      floor: rel.reply.length + 1,
      regTime: new Date()
    }
    replyModel.create(data, function(err, info) {

      if (!err) {
        var newData = {
          $push: {
            reply: info._id
          },
          lastreplyuser: req.session.user._id,
          lastreplytime: new Date()
        }
        console.log(info);
        topicModel.update(con, newData, function(err) {
          if (err) {
            console.log(err)
          }

          res.redirect("back");
        })
      }
    })
  })


}
module.exports = obj;
