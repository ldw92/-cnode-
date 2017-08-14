var fs = require("fs");
//2.加载gm图片处理模块
var gm = require("gm");
//3.安装软件(一次安装终身使用)GraphicsMagick;



//需求:统一,修改上传图片大小

/*gm("上传图片地址").resize(120,120).write("处理完毕存放地址",function(err){
	// 调试信息
		console.log(err);
	});*/


function resizeImg(imgSrc, imgDes, width, height, callback) {
  /*
  	gm("需要压缩的图片位置_path").resize(120,120).write(压缩完毕存到哪_path,function(err){
  		callback(err);
  	});
  	*/
  gm(imgSrc).resize(width, height).write(imgDes, function(err) {
    callback(err);
  });
}
module.exports = resizeImg;
