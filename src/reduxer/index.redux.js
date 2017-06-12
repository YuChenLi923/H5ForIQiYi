
import { createStore,combineReducers,dispatch } from 'redux';
import { Provider, connect } from 'react-redux';
import { Blue_Container } from '../views/index.view.js';
import { getTouchDirection,config,assign } from '../libs/ajax.public';
import ReactDOM from 'react-dom';
import React from 'react';

const reducers = combineReducers({
    NavList:NavList_reducers,
    Carousel:Carousel_reducers,
    Cards:Cards_reducers,
    search:search_reducers,
    Loading:Loading_reducers
});
const store = createStore(reducers);
let timerID = null,
    isLocalStorage = !!window.localStorage;

function createTimeid(){
  timerID = setInterval(function(){
          store.dispatch({
            type:'changIndex',
            changIndexType:1
          });
  },3000);
}
// 导航栏的reducers
function NavList_reducers(state = { items:[] , index:0 ,  isIndexHtml:true }, action) {
    switch (action.type) {
        case 'getNavListItems':
            return assign({},state,{
              items:action.items,
              index:action.index,
              showLen:action.showLen,
              callback:action.callback,
              isOn:false
            });
        case 'scrollChange':
            return assign({},state,{
              showLen:action.showLen,
            });
            break;
        case 'clickItem':
            return assign({},state,{
              index:action.index
            });
            break;
        case 'clickBtn':
            return assign({},state,{
              isOn:!state.isOn
            });
            break;
        default:
            return state
    }
}

//加载模块的reducers
function Loading_reducers( state = {loadFail:false},action){
  switch (action.type) {
    case 'loadingFailed':
      return assign({},state,{
        loadFail:true
      })
      break;
    default:
    return state;
  }

}
// 轮播图的reducers
function Carousel_reducers(state,action){
  if(state === undefined){
    state = {
      index:0,// 轮播图的初始索引
    	width:1180,// 轮播图显示宽度
    	time:3000,// 轮播动画时间
    	setIntervalTime:2000,// 自动轮播时间(ms)
    	items:[]
    }
  }
  switch (action.type) {
    case 'getCarouselItems':
      createTimeid();
      return assign({},state,{
        items:action.items,
        width:action.width,
        height:action.height,
        index:0
      });
      break;
    case 'changIndex':
    let index,
        changIndexType = action.changIndexType;
    if(changIndexType){
      index = (state.index+changIndexType)%state.items.length
      if(index < 0 )
        index = state.items.length-1;
    }else{
      index = action.index;
    }
    return assign({},state,{
      index:index
    });
    break;
    case 'scrollChange':
    return assign({},state,{
      width:action.width,
      height:action.height
    });
    case 'getStartXY':
      return assign({},state,{
        startX:action.x,
        startY:action.y
      });
    case 'touchChangeIndex':
      let dir = getTouchDirection(state.startX,state.startY,action.x,action.y),
          changeIndex = 0,
          Index;
      if( dir == 2 ){
        changeIndex = -1;
      }else if(dir == -2){
        changeIndex = 1;
      }
      Index = (state.index + changeIndex)%state.items.length;
      if(Index < 0)
        Index = state.items.length-1;
      return assign({},state,{
        index:Index
      });
    break;
    default:
    return state;
  }
}
// 搜索框的reducers
function search_reducers(state = {value:''},action){
  switch (action.type) {
    case 'inputValue':
      return assign({},state,{
        value:action.value
      });
      break;
    case 'submit':
      let searchValue = state.value;
      if(isLocalStorage){
        let history = localStorage.getItem('searchHistory') || '';
        if(history === ''){
          history = searchValue;
        }else{
          history += '&' + searchValue;
        }
        localStorage.setItem('searchHistory',history);
      }
      window.location.href = 'pages/search.html?searchContent=' + encodeURI(searchValue);
      return state;
      break;
    case 'showMobileSearch':
      window.location.href = 'pages/searchMobile.html';
      return state;
      break;
    default:
      return state;
  }
}
function Cards_reducers(state = { cards:[]},action){
  switch (action.type) {
    case 'getCardInf':
      let cards = state.cards;
      cards.push(action.card);
      return assign({},state,{
        cards:cards
      });
      break;
    default:
      return state;
  }
}
function mapStateToProps(state) {
    return {
        NavListState: state.NavList,
        CarouselState:state.Carousel,
        CardsState:state.Cards,
        searchState:state.search,
        LoadingState:state.Loading
    }
}
function mapDispatchToProps(dispatch) {
    return {
        NavListDispatch:{// 导航栏的dispatch
          clickBtn:function(){
            dispatch({type:'clickBtn'});
          }
        },
        CarouseDispatch:{// 轮播图的dispatch
          clickLast:function(){
            clearInterval(timerID);
            dispatch({
              type:'changIndex',
              changIndexType:-1
            });
          },
          clickNext:function(){
            clearInterval(timerID);
            dispatch({
              type:'changIndex',
              changIndexType:1
            });
          },
          clickNav:function(e){
            var target=e.target,
      				  index=parseInt(target.getAttribute("data-index"));
            clearInterval(timerID);
            dispatch({
              type:'changIndex',
              index:index
            });
          },
          touchStart:function(e){
            let touchs = e.touches[0];
            dispatch({
              type:'getStartXY',
              x:touchs.pageX,
              y:touchs.pageY
            });
            clearInterval(timerID);
          },
          touchEnd:function(e){
            let endX,endY,
                touchs =  e.changedTouches[0];
            endX =touchs.pageX;
            endY = touchs.pageY;
            dispatch({
              type:'touchChangeIndex',
              x:touchs.pageX,
              y:touchs.pageY
            });
            clearInterval(timerID);
            createTimeid();
            return false;
          },
          mouseOut:function(e){
              clearInterval(timerID);
            createTimeid();
          },
          mouseOver:function(e){
            clearInterval(timerID);
          }
        },
        topDisPatch:{
          search:function(){
            let isMobile = config.isMobile;
            if(isMobile){
              dispatch({type:'showMobileSearch'});
            }else{
                dispatch({type:'submit'});
            }
          },
          input:function(e){
            var value = e.target.value;
            dispatch({
              type:'inputValue',
              value:value
            });
          }
        }
    }
}
const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Blue_Container);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('container')
);
module.exports = store;
