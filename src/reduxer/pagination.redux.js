import { createStore,combineReducers,dispatch } from 'redux';
import { Provider, connect } from 'react-redux';
import { Blue_Container } from '../views/pagination.view.js';
import ReactDOM from 'react-dom';
import React from 'react';
const reducers = combineReducers({
    NavList:NavList_reducers
});
const store = createStore(reducers);
function NavList_reducers(state = { items:[] , index:0 }, action) {
    switch (action.type) {
        case 'getNavListItems':
            return Object.assign({},state,{
              items:action.items,
              index:action.index,
              showLen:action.showLen,
              callback:action.callback,
              lineIndex:action.lineIndex,
              title:action.title,
              isOn:false
            });
        case 'scrollChange':
            return Object.assign({},state,{
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
            return Object.assign({},state,{
              index:action.index,
              lineIndex:actionLine,
              title:action.title,
              isOn:isOn
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
        NavListState: state.NavList
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
