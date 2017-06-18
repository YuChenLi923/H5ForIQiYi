import { createStore,combineReducers,dispatch } from 'redux';
import { Provider, connect } from 'react-redux';
import { Blue_Container } from '../views/rank.view.js';
import { getTouchDirection,config,assign } from '../libs/public';
import ReactDOM from 'react-dom';
import React from 'react';

const reducers = combineReducers({
    search:search_reducers,
    Loading:Loading_reducers
});
const store = createStore(reducers);
let  isLocalStorage = !!window.localStorage;

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
      window.location.href = 'searchMobile.html?content=' + encodeURI(searchValue);
      return state;
      break;
    case 'showMobileSearch':
      window.location.href = 'searchMobile.html';
      return state;
      break;
    default:
      return state;
  }
}

function mapStateToProps(state) {
    return {
        searchState:state.search,
        LoadingState:state.Loading
    }
}
function mapDispatchToProps(dispatch) {
    return {
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
