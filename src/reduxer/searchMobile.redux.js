import { createStore,combineReducers,dispatch } from 'redux';
import { Provider, connect } from 'react-redux';
import { Blue_Container } from '../views/searchMobile.view.js';
import ReactDOM from 'react-dom';
import React from 'react';
const reducers = combineReducers({
  search:searchMobile_reducers
});
const store = createStore(reducers),
      isLocalStorage = !!window.localStorage;

// 获取搜索记录
function getSearchHistory(hisStr){
    if(hisStr){
      let historys = hisStr.split('&'),
          i,
          len,
          result = [];
      for( i = 0 , len = historys.length ; i < len ; i++){
        result.push(historys[i]);
      }
      return result;
    }
    return [];
}
function searchMobile_reducers(state,action){
  if(state === undefined){
    let history = getSearchHistory(localStorage.getItem('searchHistory'));
    console.log(history);
    state = {
      value:'',
      history:history
    }
  }
  switch (action.type) {
    case 'submit':
      if(isLocalStorage){
        let history = localStorage.getItem('searchHistory') || '';
        if(history === ''){
          history = state.value;
        }else{
          history += '&' + state.value;
        }
        localStorage.setItem('searchHistory',history);
      }
      return state;
      break;
    case 'inputValue':
    return Object.assign({},state,{
      value:action.value
    });
    break;
    case 'empty':
      localStorage.removeItem('searchHistory');
    return Object.assign({},state,{
      history:[]
    });
    break;
    default:
      return state;
  }
}

function mapStateToProps(state) {
    return {
      searchState:state.search
    }
}
function mapDispatchToProps(dispatch) {
  return{
    searchDispatch:{
      search:function(){
        dispatch({type:'submit'});
      },
      input:function(e){
        var value = e.target.value;
        dispatch({
          type:'inputValue',
          value:value
        });
      },
      empty:function(){
        dispatch({type:'empty'});
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
