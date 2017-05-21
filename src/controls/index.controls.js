import { ajaxExpanding } from '../libs/ajaxExpand.mini.min.js';
import { config , getScreenWidth } from '../libs/ajax.public';
import '../resource/scss/index.scss';
import store from '../reduxer/index.redux';
let  tid,
     scrollW = getScreenWidth();
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
        data = config.publicData;
    data.type = 'list';
    data.version = 7.5;
    console.log(scrollW + 'px');
    // ajax获取数据
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
                    name:data[i].name
                  });
            }
            store.dispatch(createAction('getNavListItems',{
              items:items,
              index:0,
              callback:clickNav,
              showLen:scrollW>768?10:4
            }));
        }
    },'getNavList');

    // 监听页面变化，自适应改变组件参数
    win.addEventListener('resize',scrollChange,false);
    win.addEventListener('pageshow',scrollChange, false);
})();
function scrollChange(){
  clearTimeout(tid);
  tid = setTimeout(function(){
      scrollW = getScreenWidth();
      store.dispatch(createAction('scrollChange',{
        showLen:scrollW>768?10:4
      }));
  }, 300);
}
function clickNav(value,index) {
  store.dispatch(
    createAction('clickItem',{
      index:index
    })
  )
}
function createAction(type,data){
    var action = data || {};
    action.type = type;
    return action;
}
