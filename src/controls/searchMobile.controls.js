/**
 *
 *
 *
**/
import { ajaxExpanding } from '../libs/ajaxExpand.mini.min.js';
import { config , getScreenSize ,parseURLQuery , getlimitStr ,getImgURL} from '../libs/ajax.public';
import store from '../reduxer/searchMobile.redux';
// 全局常量
const win = window,
      host = config.host,
      searchURL = host + '/openapi/realtime/search',
      publicData = config.publicData;

// 全局变量
let  tid,
     scrollW = getScreenSize().width;


// 公共函数

function scrollChange(){
  clearTimeout(tid);
  tid = setTimeout(function(){
      scrollW = getScreenSize().width;
  }, 300);
}

function createAction(type,data){
    let action = data || {};
    action.type = type;
    return action;
}

// 搜索组件逻辑控制
(function () {
  let win = window,
      query = parseURLQuery(window.location.href),
      content = query.content,
      isShow = true;
  if(content){
    isShow = false;
  }
  store.dispatch(createAction('init',{
    ajaxSearch:ajaxSearch,
    isShow:isShow,
    content:content || ''
  }));
  win.addEventListener('load',function(){
    setTimeout(function(){
      win.addEventListener('popstate',()=>window.location.reload(),false);
    },0);
  },false);
  win.addEventListener('resize',scrollChange,false);
  win.addEventListener('pageshow',scrollChange, false);
  function ajaxSearch(searchContent,myhistory){
    let data = publicData;
    data.key = searchContent;
    data.from = 'mobile_list';
    data.version = 7.5;
    ajaxExpanding.init({
      url:searchURL,
      data:data,
      dataType:'json',
      type:'get',
      async:true,
      handleData:function (result) {
          return JSON.parse(result);
      },
      onSuccess:function(result){
        let data = result.data,
            code = result.code,
            i,
            desc = '',
            items = [],
            len,
            limitLen;
        if(scrollW >=1180){
          limitLen = 25;
        }else{
          limitLen = 15;
        }
        if(code === 100000){
          for( i = 0 , len = data.length; i < len ; i++){
            items.push({
              title:getlimitStr(data[i].short_title,limitLen),
              score:data[i].sns_score,
              img:data[i].img
            });
          }
          localStorage.setItem('searchHistory',myhistory);
        }else{
          desc = "未搜索到相应内容";
        }
        store.dispatch(createAction('getSearchResult',{
          items:items,
          desc:desc
        }));
      },
      onFail:function(){
        console.log(this);
        this.data.req_times +=1;
        this.send();
      }
    }).send();
  }
})();
