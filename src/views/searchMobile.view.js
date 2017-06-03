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
        <div className = "Blue_Top fontSizeM">
              <a href="index.html"><span className="logo"></span></a>
              <span>搜索</span>
        </div>
      );
  }
}

// 搜索内容卡片组件
class Blue_SearchCard extends React.Component{
  render(){
    let {
          img,
          title,
          score
        } = this.props.item;
    return (
      <div className = "Blue_SearchCard">
        <img src={img} />
        <div className = "desc fontSizeL">
          <span className="name">{title}</span>
          <span className="score">{score||'无'}</span>
        </div>
      </div>
    )
  }
}
// 移动端搜索组件
class Blue_SearchMobile extends React.Component{
  _creatCards(items,desc){
      let i,
          len = items.length,
          result = [];
      if(len === 0 ){
        result.push(
          <p className="searching fontSizeM" key={0}>{desc}</p>
        )
      }
      else{
        for(i = 0 ; i < len ; i++){
          result.push(
            <Blue_SearchCard key = {i} item = {items[i]}/>
          )
        }
      }
      return result;
  }
  _clickHistory(value){
    let that = this;
    return function(){
      that.props.clickHistory(value);
    }
  }
  render(){
    let { input,
          search,
          myhistory,
          empty,
          isShow,
          items,
          desc,
          value,
          isSearching
        } = this.props,
        that = this;
    return (
      <div className  = "Blue_SearchMobile">
          <div className="inputWarp">
              <input className = "fontSizeL" value = {value} onInput = {input} />
              <button onClick = {search}></button>
          </div>
          { isShow&&!isSearching&&
            <div className="myHistory">
              <h1 className = "fontSizeM">搜索记录</h1>
              <ul>
                {
                  myhistory.map((value,index)=>{
                    return(<li key = {index}
                                onClick = {that._clickHistory(value)}
                                className = "fontSizeM"
                           >
                      <span>{value}</span>
                    </li>);
                  })
                }
              </ul>
              {
                do{
                  if(myhistory.length>0){
                      <div>
                        <button className="empty" onClick = {empty}></button>
                        <p className="emptyWarn fontSizeSS">清空记录</p>
                      </div>
                  }else{
                    <p className = "fontSizeM">目前还没有搜索记录!</p>
                  }
                }
              }
            </div>
          }
          {do{
            if(!isShow&&!isSearching){
              <div className = "searchContent">
                {
                  this._creatCards(items,desc)
                }
              </div>
            }
          }}
          {
            isSearching&&
            <p className = 'searching fontSizeM'>正在搜索中....</p>
          }
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
