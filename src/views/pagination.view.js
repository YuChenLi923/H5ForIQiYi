import React from 'react';
import Zq from './Zq.view';
// 导航栏
class Blue_NavList extends React.Component{
    _click(item,index){
      var that = this;
      return function(){
          that.props.callback(item,index);
      }
    }
    _createList(items,index){
        let i,
            len,
            result = [];
        for( i = 0 , len = items.length ; i < len ;i++){
            result.push(
                <a  onClick={this._click(items[i],i)}
                    key={i} className={index === i?'on':'off'}
                >
                    {items[i].name}
                </a>
            );
        }
        return result;
    }
    render(){
        let {
              items,
              index,
              callback,
              isOn,
              showLen,
              lineIndex,
              clickItem,
              clickBtn
             } = this.props;
        let len = items.length;
        return (
            <nav className="Blue_NavList" >
              <div className = "list maxWarp" style = {
                {
                  height:isOn?Math.ceil(len/showLen)*20+'px':(lineIndex)*20 + 'px',
                  marginTop:!isOn?((lineIndex-1)*20)*-1 + 'px':'0px'
                }}>
                {this._createList(items,index,callback)}
              </div>
              <div className = "dropBox">
                <button onClick = {clickBtn}
                        className = {isOn?'on':'off'}
                ></button>
              </div>
            </nav>
        );
    }
}

// 顶部
class Blue_Top extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
      return (
        <div className = 'Blue_Top'>
            <div className = 'maxWarp'></div>
        </div>
      );
  }
}
class Blue_Container extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let { NavListDispatch , NavListState } = this.props;
        return(
            <div className="Blue_Container">
                <header>
                    <Blue_Top/>
                    <div className="blackBox"></div>
                    <Blue_NavList {...NavListState}  {...NavListDispatch} />
                </header>
                <div className = 'body'>
                  <Zq Title={NavListState.title}/>
                </div>
                <footer>
                    蓝山工作室15级前端组制作
                </footer>
            </div>
        );
    }
}
module.exports = {
    Blue_Container:Blue_Container
};
