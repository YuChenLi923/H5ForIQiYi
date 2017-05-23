import { createStore,combineReducers,dispatch } from 'redux';
import { Provider, connect } from 'react-redux';
import { Blue_Container } from '../views/index.view.js';
import { getTouchDirection } from '../libs/ajax.public';
import ReactDOM from 'react-dom';
import React from 'react';
const reducers = combineReducers({
    NavList:NavList_reducers,
    Carousel:Carousel_reducers
});
const store = createStore(reducers);
let timerID = null;

function createTimeid(){
  timerID = setInterval(function(){
          store.dispatch({
            type:'changIndex',
            changIndexType:1
          });
  },3000);
}
function NavList_reducers(state = { items:[] , index:0 }, action) {
    switch (action.type) {
        case 'getNavListItems':
            return Object.assign({},state,{
              items:action.items,
              index:action.index,
              showLen:action.showLen,
              callback:action.callback,
              isOn:false
            });
        case 'scrollChange':
            return Object.assign({},state,{
              showLen:action.showLen,
            });
            break;
        case 'clickItem':
            return Object.assign({},state,{
              index:action.index
            });
            break;
        case 'clickBtn':
            return Object.assign({},state,{
              isOn:!state.isOn
            });
            break;
        default:
            return state
    }
}

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
      return Object.assign({},state,{
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
    return Object.assign({},state,{
      index:index
    });
    break;
    case 'scrollChange':
    return Object.assign({},state,{
      width:action.width,
      height:action.height
    });
    case 'getStartXY':
      return Object.assign({},state,{
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
      return Object.assign({},state,{
        index:Index
      });
    break;
    default:
    return state;
  }
}
function mapStateToProps(state) {
    return {
        NavListState: state.NavList,
        CarouselState:state.Carousel
    }
}
function mapDispatchToProps(dispatch) {
    return {
        NavListDispatch:{
          clickBtn:function(){
            dispatch({type:'clickBtn'});
          }
        },
        CarouseDispatch:{
          clickLast:function(){
            clearInterval(timerID);
            dispatch({
              type:'changIndex',
              changIndexType:-1
            });
            createTimeid();
          },
          clickNext:function(){
            clearInterval(timerID);
            dispatch({
              type:'changIndex',
              changIndexType:1
            });
            createTimeid();
          },
          clickNav:function(e){
            var target=e.target,
      				  index=parseInt(target.getAttribute("data-index"));
              clearInterval(timerID);
            dispatch({
              type:'changIndex',
              index:index
            });
            createTimeid();
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
