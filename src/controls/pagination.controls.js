import { ajaxExpanding } from '../libs/ajaxExpand.mini.min.js';
import { config ,  getScreenSize ,parseURLQuery } from '../libs/ajax.public';
import store from '../reduxer/pagination.redux';
let  tid,
     scrollW = getScreenSize().width;
// 初始ajaxExpanding对象
ajaxExpanding.init({
    name:'getNavList',
    dataType:'json',
    type:'get',
    async:true,
    handleData:function (result) {
        return JSON.parse(result);
    }
});

(function () {
  const win = window,
        host = config.host,
        getChannelList = host + '/openapi/realtime/channel',
        title = document.querySelector('title'),
        queryObj = parseURLQuery(win.location.href),
        type = queryObj.type || -1,
        data = config.publicData;
    data.type = 'list';
    data.version = 7.5;
    // ajax获取数据
    ajaxExpanding.send({
        url:getChannelList,
        data:data,
        onSuccess:function (result) {
            var i,
                len,
                index = -1,
                data = result.data,
                items = [];
            for( i = 0 , len = data.length ; i < len ; i++){
                  if(data[i].id == type){
                    index = i;
                  }
                  items.push({
                    name:data[i].name,
                    id:data[i].id
                  });
            }
            handleRoute(index,data);
            console.log(scrollW);
            store.dispatch(createAction('getNavListItems',{
              getDetail:getDetail,
              items:items,
              index:index,
              title:items[index].name,
              isOn:false,
              lineIndex:scrollW>768?Math.floor(index/10)+1:Math.floor(index/4)+1,
              callback:clickNav,
              showLen:scrollW>768?10:4
            }));
        }
    },'getNavList');
    // 监听页面变化，自适应改变组件参数
    win.addEventListener('resize',scrollChange,false);
    win.addEventListener('pageshow',scrollChange, false);
    win.addEventListener('popstate',()=>window.location.reload(),false);
    function handleRoute(index,data){
      if(index>-1){
        title.innerHTML = data[index].name;
      }else{
        win.location.href = 'error404.html';
      }
    }
})();
function scrollChange(){
  clearTimeout(tid);
  tid = setTimeout(function(){
      scrollW = getScreenSize().width;
      store.dispatch(createAction('scrollChange',{
        showLen:scrollW>768?10:4
      }));
  }, 300);
}
function clickNav(item,index) {
  let title = document.querySelector('title'),
      name = item.name,
      newURL = "pagination.html?type=" + item.id;
  history.pushState({
    id:item.id
  }, name, newURL);
  title.innerHTML = name;
  store.dispatch(
    createAction('clickItem',{
      index:index,
      title:name,
      getDetail:getDetail,
      lineIndex:scrollW>768?Math.floor(index/10)+1:Math.floor(index/4)+1
    })
  );
}
function createAction(type,data){
    var action = data || {};
    action.type = type;
    return action;
}

function getDetail(name) {
  // 请求详细信息ajax
  // 设置本次请求的data
  var zq_data = config.publicData;
  zq_data.type = 'detail';
  zq_data.version = 7.5;
  zq_data.mode = 11;
  // data.is_purchase = 2; //是否付费的片子
  zq_data.page_size = 30;
  zq_data.channel_name = name;
  console.log("title:",name)
  ajaxExpanding.send({
      url:config.host + '/openapi/realtime/channel',
      data:zq_data,
      onSuccess:function (result) {
        store.dispatch(createAction('newDetails',{
          datas:result
        }))
        console.log("详细信息：",result)
      }
  },'getDetails')
}
