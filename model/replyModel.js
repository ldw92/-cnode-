
var mongoose = require("../config/db_config");
var replySchema = new mongoose.Schema({
  content: String,
  uid: {
    type: 'ObjectId',
    ref: "cnode_user"
  },
  tid: {
    type: 'ObjectId',
    ref: "cnode_topic"
  },
  regTime: Date,
  floor: Number
});
var replyModel = mongoose.model("cnode_reply", replySchema, "cnode_reply");
module.exports = replyModel;
