/**
 *
 *
 *
**/
import { ajaxExpanding } from '../libs/ajaxExpand.mini.min.js';
import { config , getScreenSize, getlimitStr } from '../libs/ajax.public';
import store from '../reduxer/index.redux';
// 全局常量
const win = window,
      host = config.host,
      publicData = config.publicData;

// 全局变量
let  tid,
     scrollW = getScreenSize().width;
// 初始化ajaxExpanding对象 getNavList-获取导航栏信息 getCarousel-获取轮播图信息
ajaxExpanding.init({
    name:'getNavList',
    dataType:'json',
    type:'get',
    async:true,
    handleData:function (result) {
        return JSON.parse(result);
    }
});
ajaxExpanding.init({
  name:'getCarousel',
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

    let getChannelList = host + '/openapi/realtime/channel',
        data = publicData;
    data.type = 'list';
    data.version = 7.5;
    // ajax获取导航栏数据
    ajaxExpanding.send({
        url:getChannelList,
        data:data,
        onSuccess:function (result) {
            var i,
                len,
                data = result.data,
                items = [];
            for( i = 0 , len = data.length ; i < len ; i++){
                  items.push({
                    name:data[i].name,
                    id:data[i].id
                  });
            }
            store.dispatch(createAction('getNavListItems',{
              items:items,
              index:-1,
              callback:clickNav,
              showLen:scrollW>768?10:4
            }));
        }
    },'getNavList');
    // 监听页面变化，自适应改变组件参数
    win.addEventListener('resize',scrollChange,false);
    win.addEventListener('pageshow',scrollChange, false);
    function clickNav(item,index) {
      window.location.href = 'pagination.html?type='+item.id;
    }
})();

// 获取推荐信息

(function(){
  let getCarouselURL = host + '/openapi/realtime/recommend',
      data = publicData;
  ajaxExpanding.send({
    url:getCarouselURL,
    data:data,
    onSuccess:function(result){
      let i,
          len,
          code = result.code,
          data = result.data;
      for( i = 0 , len = data.length ; i < len ; i++){
        handleRecommend(data[i].title,data[i]);
      }
    }
  },'getCarousel');
})();


// 将推荐信息分发给个组件处理

function handleRecommend(title,data){
  switch (title) {
    case '轮播图':
      setCarousel(data);
      break;
    default:
    setCardInf(data);
    break;
  }
}

// 设置轮播图信息

function setCarousel(data){
  let i,
      items = [],
      videos = data.video_list,
      len = videos.length;
  for( i = 0 ;  i < len ; i++){
    items.push({
      src:'#',
      img:videos[i].img,
      title:getlimitStr(videos[i].short_title,15,'...')
    });
  }
  store.dispatch(createAction('getCarouselItems',{
    items:items,
    width:scrollW<=768?scrollW/config.scale:1180,
    height:scrollW>768?316/640*1180:316/640*scrollW/config.scale
  }))
}


// 设置各个卡片的信息

function setCardInf(data){
  let i,
      items = [],
      card = {},
      title = data.title,
      id = data.channel_id,
      videos = data.video_list,
      len = videos.length;
  for( i = 0 ;  i < len ; i++){
    items.push({
      src:'#',
      img:videos[i].img,
      title:getlimitStr(videos[i].short_title,10)
    });
  }
  card.id  = id;
  card.title = title;
  card.items = items;
  store.dispatch(createAction('getCardInf',{
    card:card
  }))
}
