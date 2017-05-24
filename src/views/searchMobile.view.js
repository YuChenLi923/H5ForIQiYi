import React from 'react';

//  <div className = "search">
//     <input placeholder = "请输入你想搜索的内容" onInput = {input}/>
//     <button onClick = {search} ></button>
//  </div>
// 顶部
class Blue_Top extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
      let { search,input } = this.props;
      return (
        <div className = "Blue_Top">
              <span>搜索</span>
        </div>
      );
  }
}
// 移动端搜索组件

class Blue_SearchMobile extends React.Component{
  render(){
    let { input , search , history , empty} = this.props;
    return (
      <div className  = "Blue_SearchMobile">
          <div className="inputWarp">
              <input onInput = {input}/>
              <button onClick = {search}></button>
          </div>
          <div className="myHistory">
            <h1>搜索记录</h1>
            <ul>
              {
                history.map((value,index)=>{
                  return(<li key = {index}>
                    <span>{value}</span>
                  </li>);
                })
              }
            </ul>
            {
              do{
                if(history.length>0){
                    <div>
                      <button className="empty" onClick = {empty}></button>
                      <p className="emptyWarn">清空记录</p>
                    </div>
                }else{
                  <p>目前还没有搜索记录!</p>
                }
              }
            }
          </div>
      </div>
    )
  }
}

class Blue_Container extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let {searchState , searchDispatch } = this.props;
        return(
            <div className="Blue_Container">
                <header>
                    <Blue_Top/>
                </header>
                <Blue_SearchMobile {...searchState} {...searchDispatch}/>
            </div>
        );
    }
}
module.exports = {
    Blue_Container:Blue_Container
};
