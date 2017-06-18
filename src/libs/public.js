const appConfig = {
  host:"http://iface.qiyi.com",
  ourHost:"http://www.yuchenblog.cn:8080/iqiyi",
  publicData:{
    app_k:"f0f6c3ee5709615310c0f053dc9c65f2",
    app_v:8.4,
    app_t:0,
    platform_id:10,
    dev_os:6.0,
    dev_ua:"MI 5",
    dev_hw:{
      cpu:0,
      gpu: "",
      mem:"50.4MB"
    },
    net_sts:1,
    scrn_sts:1,
    scrn_res:"1334*750",
    scrn_dpi:"153600",
    qyid:"87390BD2-DACE-497B-9CD4-2FD14354B2A4",
    secure_v:1,
    secure_p:"GPhone",
    core:1,
    req_sn:"1493946331320",
    req_times:1
  },
  dpr:1,
  scale:1,
  isMobile:false,
  width:0 ,// 屏幕宽度
  height:0// 屏幕高度
},
doc = document,
win = window,
docEl = doc.documentElement,
metaEl = doc.querySelector('meta[name="viewport"]');

// 更新config

function updateConfig(){
  getDeviceInf();
  return appConfig;
}

// 获取设备信息
(function getDeviceInf(){
  let appVersion = win.navigator.appVersion,
      isAndroid = appVersion.match(/android (\d\.\d)/i),
      isIPhone = appVersion.match(/iphone os (\d)/i),
      devicePixelRatio = win.devicePixelRatio,
      width = docEl.getBoundingClientRect().width,
      height = docEl.clientHeight,
      dpr = 1,
      scale = 1,
      mobileSystemV = 0;
  // 是手机
  if(isAndroid || isIPhone ){
      mobileSystemV = isAndroid?isAndroid[1]:isIPhone[1];
  }
  if (isIPhone) {
    if (devicePixelRatio >= 3) {
      dpr = 3;
    }else if (devicePixelRatio >= 2){
      dpr = 2;
    }else {
        dpr = 1;
    }
  }else {
    dpr = 1;
  }
  scale = parseFloat((1 / dpr).toFixed(2));
  docEl.setAttribute('data-dpr', dpr);
  metaEl.setAttribute('content', 'width=device-width,initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
  updateRem(width,dpr);
  if(width*scale>=768){
    appConfig.imgSzie = '_480_360';
  }else{
    appConfig.imgSzie = '_180_236';
    appConfig.isMobile = true;
  }
  appConfig.scale = scale;
  appConfig.dpr = dpr;
  appConfig.width = width;
  appConfig.height = height;
  appConfig.publicData.scrn_dpi = width * height;
  appConfig.publicData.scrn_res = width + '*' + height;
  appConfig.publicData.dev_os = mobileSystemV || 6.0;
})();


// 动态获取屏幕宽度、高度,同时更新REM
function getScreenSize(){
   let width = docEl.getBoundingClientRect().width,
       height = docEl.clientHeight;
    if(width*appConfig.scale>=768){
       appConfig.imgSzie = '_480_360';
       appConfig.isMobile = false;
     }else{
       appConfig.imgSzie = '_180_236';
       appConfig.isMobile = true;
    }
    updateRem(width,appConfig.dpr);
    return {
      width:Math.ceil(width*appConfig.scale),
      height:Math.ceil(height*appConfig.scale)
    }
}


function assign(target,curObject,addObject){
  var i;
  for( i in curObject){
    if( curObject.hasOwnProperty(i) && !addObject.hasOwnProperty(i)){
      target[i] = curObject[i];
    }
  }
  for( i in addObject){
    if( addObject.hasOwnProperty(i)){
      target[i] = addObject[i];
    }
  }
  return target;
}
// 更新rem

function updateRem(width,dpr){
  let rem;
  if (width / dpr > 540) {
      width = 540 * dpr;
  }
  rem = width / 10;
  appConfig.rem = rem;
  docEl.style.fontSize = rem + 'px';
  if(width*appConfig.scale <= 768 )
    appConfig.isMobile = true;
}

// 解析query

function parseURLQuery(str){
  const queryStr = decodeURI(str).split('?')[1],
		   result = {};
	if(queryStr) {
		let queryArry = queryStr.split('&'),
			  i,
			  keyValue,
			  len;
		for( i = 0 , len = queryArry.length ; i < len ; i++){
			keyValue = queryArry[i].split('=');
			result[keyValue[0]]=keyValue[1];
		}
	}
	return result;
}

// 根据两点坐标判断touch方向

function getTouchDirection(startX,startY,endX,endY){
  let disY = startY - endY,
      disX = endX - startX,
      touchDis = Math.sqrt( disX*disX + disY*disY),
      tanV = disY / disX,
      dir = Math.atan2(disY , disX)/(Math.PI)*180;
  if(touchDis < 3){
    return 0;
  }
  if( dir <= 135 && dir >45){
    return 1; // 向上
  }
  if( dir <= -45 && dir >-135 ){
    return -1; //向下
  }
  if( dir <= 45 && dir >-45 ){
    return 2; // 向右
  }
  if( (dir >= 135 && dir <= 180) || (disX <= -135 && dir > -180)){
      return -2; // 向左
  }
  return 0;
}

function getlimitStr(str,limitLen,suffix){
  let i,
      suf = suffix || '',
      len = str.length;
  if(len >= limitLen)
    str = str.substring(0,limitLen-1) + suf;
  return str;
}

// 处理适配图片问题

function getImgURL(url,size){
  let suffixStart = url.lastIndexOf('.',url.length),
      imgURL = url.substring(0,suffixStart),
      suffix = url.substring(suffixStart,url.length),
      newURL;
  if(size)
    newURL = imgURL + size + suffix + '?sign=iqiyi';
  else
    newURL = imgURL + appConfig.imgSzie + suffix + '?sign=iqiyi';
  return newURL;
}
module.exports = {
    config:appConfig,
    getImgURL:getImgURL,
    parseURLQuery:parseURLQuery,
    getScreenSize:getScreenSize,
    getTouchDirection:getTouchDirection,
    getlimitStr:getlimitStr,
    assign:assign,
    updateConfig:updateConfig
};
