
import { createStore,combineReducers,dispatch } from 'redux';
import { Provider, connect } from 'react-redux';
import { Blue_Container } from '../views/pagination.view.js';
import { config,assign,getScreenSize } from '../libs/ajax.public';
import ReactDOM from 'react-dom';
import React from 'react';
let   isLocalStorage = !!window.localStorage;
const reducers = combineReducers({
    NavList:NavList_reducers,
    search:search_reducers,
    Details:Detail_reducers
});
const store = createStore(reducers);
function NavList_reducers(state = { items:[] , index:0,isIndexHtml:false }, action) {
    switch (action.type) {
        case 'getNavListItems':
            return assign({},state,{
              items:action.items,
              index:action.index,
              showLen:action.showLen,
              callback:action.callback,
              lineIndex:action.lineIndex,
              title:action.title,
              isOn:false
            });
        case 'scrollChange':
            return assign({},state,{
              showLen:action.showLen,
            });
            break;
        case 'clickItem':
            let actionLine = action.lineIndex,
                stateLine = state.lineIndex,
                isOn = !state.isOn;
            if(actionLine === stateLine){
              isOn = false;
            }
            return assign({},state,{
              index:action.index,
              lineIndex:actionLine,
              title:action.title,
              isOn:isOn
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

function Detail_reducers(state = {loading:true,nodata:0,videos:[]}, action) {
  switch (action.type) {
    case 'getNavListItems':
      console.log("first")
    case 'clickItem':
      action.getDetail(action.title);
      return assign({},state,{
        loading:true
      });
      break;
    case 'newDetails':
      if(action.datas.code==100000)
        return assign({},state,{
          loading:false,
          nodata:0,
          videos:action.datas.data.video_list
        });
      else {
        return assign({},state,{
          loading:false,
          nodata:1,
          videos:[],
          error:'哎呀，找不到数据了！'
        });
      }
    default:
      return state;
  }
  return state;
}

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
      window.location.href = 'searchMobile.html?content=' + encodeURI(searchValue);
      return state;
      break;
    case 'showMobileSearch':
      window.location.href = 'searchMobile.html';
      break;
    default:
      return state;
  }
}
function mapStateToProps(state) {
    return {
        NavListState: state.NavList,
        searchState:state.search,
        DetailsState: state.Details
    }
}
function mapDispatchToProps(dispatch) {
  return{
    NavListDispatch:{
      clickItem:function(){
        dispatch({type:'clickItem'})
      },
      clickBtn:function(){
        dispatch({type:'clickBtn'})
      }
    },
    topDisPatch:{
      search:function(){
         if(getScreenSize().width<768){
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
      },
      keyPress:function(e){
        if(e.charCode == 13)
          dispatch({type:'submit'});
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
