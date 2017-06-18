import { ajaxExpanding } from '../libs/ajaxExpand.mini.min.js';
import { config , getScreenSize, getlimitStr,getImgURL } from '../libs/public';
import store from '../reduxer/rank.redux';
// 全局常量
const win = window,
      host = config.host,
      publicData = config.publicData;

// 全局变量
let  tid,
     scrollW = getScreenSize().width;
// 公共函数

function scrollChange(){
  clearTimeout(tid);
  tid = setTimeout(function(){
      scrollW = getScreenSize().width;
      store.dispatch(createAction('scrollChange',{
        showLen:scrollW>768?10:4,
        width:scrollW<=1180?scrollW/config.scale:1180,
        height:scrollW>1180?316/640*1180:316/640*scrollW/config.scale
      }));
  }, 300);
}

function createAction(type,data){
    let action = data || {};
    action.type = type;
    return action;
}

// 导航栏组件逻辑控制
(function () {
    // 监听页面变化，自适应改变组件参数
    win.addEventListener('resize',scrollChange,false);
    win.addEventListener('pageshow',scrollChange, false);

})();

// 获取推荐信息

(function(){

})();
