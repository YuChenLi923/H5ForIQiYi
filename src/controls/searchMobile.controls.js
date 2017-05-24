/**
 *
 *
 *
**/
import { ajaxExpanding } from '../libs/ajaxExpand.mini.min.js';
import { config , getScreenSize } from '../libs/ajax.public';
import store from '../reduxer/searchMobile.redux';
// 全局常量
const win = window,
      host = config.host,
      publicData = config.publicData;

// 全局变量
let  tid,
     scrollW = getScreenSize().width;
// 初始化ajaxExpanding对象
ajaxExpanding.init({
    name:'getNavList',
    dataType:'json',
    type:'get',
    async:true,
    handleData:function (result) {
        return JSON.parse(result);
    }
});

// 公共函数

function scrollChange(){
  clearTimeout(tid);
  tid = setTimeout(function(){
      scrollW = getScreenSize().width;
      store.dispatch(createAction('scrollChange',{
        showLen:scrollW>768?10:4,
        width:scrollW>768?1180:scrollW,
        height:scrollW>768?316/640*1180:316/640*scrollW
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


})();
