var mongoose = require("../config/db_config");

// console.log(mongoose);
var topicSchema = new mongoose.Schema({
  title: String,
  content: String,
  uid: {
    type: "ObjectId",
    ref: "cnode_user"
  },
  visits: {
    type: Number,
    default: 0
  },
  reTime: Date,
  reply: [{
    type: "ObjectId",
    ref: 'cnode_user'
  }],

  lastreplyuser: {
    type: "ObjectId",
    ref: "cnode_user"
  },
  lastreplytime: Date
});

var topicModel = mongoose.model("cnode_topics", topicSchema, "cnode_topics");

module.exports = topicModel;
