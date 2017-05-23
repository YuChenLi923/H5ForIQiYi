const appConfig = {
  host:"http://iface.qiyi.com",
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
  isMobile:false,
  width:0 ,// 屏幕宽度
  height:0// 屏幕高度
},
doc = document,
win = window,
docEl = doc.documentElement,
metaEl = doc.querySelector('meta[name="viewport"]');


// 获取设备信息
(function getDeviceInf(){
  let appVersion = win.navigator.appVersion,
      isAndroid = appVersion.match(/android (\d\.\d)/i),
      isIPhone = appVersion.match(/iphone os (\d)/i),
      devicePixelRatio = win.devicePixelRatio,
      width = docEl.getBoundingClientRect().width,
      height = docEl.clientHeight,
      dpr = 1,
      mobileSystemV = 0;
  // 是手机
  if(isAndroid || isIPhone ){
      appConfig.isMobile = true;
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
  docEl.setAttribute('data-dpr', dpr);
  updateRem(width,dpr);
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
    updateRem(width,appConfig.dpr);
    return {
      width:width,
      height:height
    }
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
  console.log(dir,tanV);
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


module.exports = {
    config:appConfig,
    parseURLQuery:parseURLQuery,
    getScreenSize:getScreenSize,
    getTouchDirection:getTouchDirection
};
