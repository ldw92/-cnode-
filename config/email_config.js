const nodemailer = require('nodemailer');
//定义传输协议
function set(userName, userEmail, userId) {
  console.log(userName, userEmail, userId);
  var trnasport = nodemailer.createTransport({
    //固定写法
    host: "smtp.qq.com",
    //授权验证
    auth: {
      //获取受权的邮箱
      user: "348192549@qq.com",
      pass: "zgnzxbdmisjtcaah"
    }
  })

  //定义传出内容
  var maiOptions = {
    //发件人
    form: "xdl_conde<348192549@qq.com>",
    to: userEmail,
    subject: "Cnode邮箱验证",
    html: "欢迎" + userName + "注册Cnode" + "<a href='http://localhost/users/activeok/" + userId + "'>点击跳转</a>"
  }
  transport.sendMail(maiOptions, function(err) {
    console.log(err, info);
  })
}
;
module.exports = set;
