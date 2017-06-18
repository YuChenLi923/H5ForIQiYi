/**
 *
 *
 *
**/
import { ajaxExpanding } from '../libs/ajaxExpand.mini.min.js';
import { config , getScreenSize ,parseURLQuery , getlimitStr ,getImgURL} from '../libs/public';
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
(function (win,doc) {
  let query = parseURLQuery(win.location.href),
      content = query.content,
      isShow = true,
      page = 1,
      isAjaxing = false,
      preToBottom;
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
      win.addEventListener('popstate',()=>win.location.reload(),false);
    },0);
  },false);
  win.addEventListener('scroll',function(e){
		let  scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop,
		     viewHeight =Math.min(document.documentElement.scrollHeight,document.documentElement.clientHeight),
		     docHeight=Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight),
         toBottom = scrollTop-docHeight+viewHeight;

    // 显示置顶按钮
    if(scrollTop > 700 ){
      store.dispatch(createAction('showTop',{
        showTop:true
      }));
    }else{
        store.dispatch(createAction('showTop',{
          showTop:false
        }));
    }
    // 到达页面底部，更新数据
    if(toBottom >= -10){
      // 判断是否是向下滚动
      if(!preToBottom || preToBottom < toBottom){

        if(isAjaxing){
          store.dispatch(createAction('updateing',{
            isUpdateing:true
          }));
            ajaxSearch(content,false,true);
        }

      }
		}
    preToBottom = toBottom;
	});
  win.addEventListener('resize',scrollChange,false);
  win.addEventListener('pageshow',scrollChange,false);
  function ajaxSearch(searchContent,myhistory,update){
    let data = publicData;
    data.key = searchContent;
    data.from = 'mobile_list';
    data.pg_num = page;
    data.page_size=scrollW>768?10:5;
    data.version = 7.5;
    content = searchContent;
    isAjaxing = false;
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
        if(update)
        store.dispatch(createAction('updateing',{
          isUpdateing:false
        }));
        let data = result.data,
            code = result.code,
            i,
            desc = '',
            items = [],
            len,
            limitLen;
        ++ page;
        isAjaxing = true;
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
              img:getImgURL(data[i].img,'_180_236')
            });
          }
          if(myhistory)
          localStorage.setItem('searchHistory',myhistory);
        }else{

          if(update){
            store.dispatch(createAction('updateing',{
              isUpdateing:false
            }));
          }

          isAjaxing = false;
          desc = "未搜索到相应内容";
        }
        store.dispatch(createAction(update?'updateResult':'getSearchResult',{
          items:items,
          desc:desc
        }));
      },
      onFail:function(){
        this.data.req_times +=1;
        this.send();
      }
    }).send();
  }
})(window,document);
