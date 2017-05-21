// 获取屏幕宽度
function getScreenWidth(){
    var docEl = document.documentElement;
    return docEl.getBoundingClientRect().width;
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
  }
};


module.exports = {
    config:appConfig,
    parseURLQuery:parseURLQuery,
    getScreenWidth:getScreenWidth
};
