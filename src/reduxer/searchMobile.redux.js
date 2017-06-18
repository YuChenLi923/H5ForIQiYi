import { createStore,combineReducers,dispatch } from 'redux';
import { Provider, connect } from 'react-redux';
import { Blue_Container } from '../views/searchMobile.view.js';
import { assign } from '../libs/public';
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
// 添加历史记录，并且去重
function setSearchHistory(value,curHistory){
  let i,
      len,
      result = '',
      myhistory = localStorage.getItem('searchHistory') || '';
  if( myhistory === ''){
      result = value;
  }else{
      result = myhistory + '&' + value;
  }
  for( i = 0 , len = curHistory.length ; i < len ; i++){
    if(value === curHistory[i]){
      result = myhistory;
      break;
    }
  }
  return result;
}

function searchMobile_reducers(state,action){
  if(state === undefined){
    state = {
      value:'',
      isShow:true,
      myhistory:[],
      items:[],
      desc:'',
      isSearching:false,
      isUpdateing:false,
      showTop:false
    }
  }
  switch (action.type) {
    case 'init':
      let  curHistory = localStorage.getItem('searchHistory'),
           myhistory = getSearchHistory(curHistory),
           content = action.content;
      if(content)
        action.ajaxSearch(content,curHistory);
      return assign({},state,{
        myhistory:myhistory || [],
        ajaxSearch:action.ajaxSearch,
        value:action.content,
        isShow:action.isShow,
        isSearching:content?true:false
      });
      break;
    case 'updateing':
      return assign({},state,{
        isUpdateing:true
      });
      break;
    case 'showTop':
      return assign({},state,{
        showTop:action.showTop
      });
      break;
    case 'submit':
      if(isLocalStorage){
        let value = state.value,
            myhistory = setSearchHistory(value,state.myhistory),
            newURL = 'searchMobile.html?content='+value;
        history.pushState({},'',newURL);
        state.ajaxSearch(value,myhistory);
      }
      return assign({},state,{
        isSearching:true,
        isShow:false
      });
      break;
    case 'inputValue':
    return assign({},state,{
      value:action.value
    });
    break;
    case 'empty':
      localStorage.removeItem('searchHistory');
    return assign({},state,{
      myhistory:[]
    });
    break;
    case 'getSearchResult':
    return assign({},state,{
      isShow:false,
      isSearching:false,
      items:action.items,
      desc:action.desc
    });
    case 'updateResult':
    return assign({},state,{
      isShow:false,
      isSearching:false,
      items:state.items.concat(action.items),
      desc:action.desc,
      isUpdateing:false
    });
    break;
    case 'clickHistory':
    let value = action.value,
        myHistory = setSearchHistory(value,state.myhistory),
        newURL = 'searchMobile.html?content='+value;
        history.pushState({},'',newURL);
        state.ajaxSearch(value,myHistory);
        return assign({},state,{
          isSearching:true,
          isShow:false,
          value:value
        });
      break;
    default:
      return state;
  }
}

//翻页

// function Pt_reducers(state,action){
//   if(state == undefined){
//     return {
//       sum:11,
//       index:1,
//       start:1,
//       showNum:7
//     }
//   }else{
//     switch (action.type) {
//       case 'changePage':
//         var { index , showNum , sum, start} = state,
//             { add,toIndex} = action;
//         if( index + add > 0 && index + add <= sum){
//           index = toIndex? toIndex : index + add;
//         }
//         if( index == sum){
//           start = index - showNum + 1>0?index-showNum+1:1;
//         }else if(index  >Math.floor(showNum)/2 && index < sum-Math.floor(showNum/2-1)){
//           start = index -Math.floor(showNum/2);
//         }else if( index <= Math.floor(showNum/2)){
//           start = 1;
//         }
//         return assign({},state,{
//           start:start,
//           index:index
//         });
//         break;
//       default:
//       return state;
//     }
//   }
// }
function mapStateToProps(state) {
    return {
      searchState:state.search,
        PtState:state.Pt
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
      keyPress:function(e){
        if(e.charCode == 13)
            dispatch({type:'submit'});
      },
      empty:function(){
        dispatch({type:'empty'});
      },
      toTop:function(){
        scrollTo(0,0);
      },
      clickHistory:function(value){
        dispatch({type:'clickHistory',value:value});
      }
    }
    // PtDispatch:{
    //   last:function(){
    //     dispatch({type:'changePage',add:-1,toIndex:false})
    //   },
    //   next:function(){
    //     dispatch({type:'changePage',add:1,toIndex:false})
    //   },
    //   click:function(e){
    //     dispatch({type:'changePage',add:0,toIndex:parseInt(e.target.getAttribute('data-index'))});
    //   }
    // }
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
