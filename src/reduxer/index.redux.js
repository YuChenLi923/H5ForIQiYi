import { createStore,combineReducers,dispatch } from 'redux';
import { Provider, connect } from 'react-redux';
import { Blue_Container } from '../views/index.view.js';
import ReactDOM from 'react-dom';
import React from 'react';
const reducers = combineReducers({
    NavList:NavList_reducers
});
const store = createStore(reducers);
const CarouselState = {
  index:0,// 轮播图的初始索引
	width:1180,// 轮播图显示宽度
	time:1000,// 轮播动画时间
	easing:'ease',
	setIntervalTime:8000,// 自动轮播时间(ms)
	items:[// 轮播内容(这个之后通过ajax接入数据)
		{
			src:"#",//点击后打开新窗口进入地址
			img:"../resource/images/1.png" // 轮播图图片路径
		},
		{
			src:"#",
			img:"../resource/images/1.png"
		},
		{
			src:"#",
			img:"../resource/images/1.png"
		}
	]
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
function mapStateToProps(state) {
    return {
        NavListState: state.NavList,
        CarouselState:CarouselState
    }
}
const App = connect(
    mapStateToProps
)(Blue_Container);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('container')
);
module.exports = store;
