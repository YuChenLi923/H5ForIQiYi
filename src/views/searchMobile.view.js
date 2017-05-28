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
        <div className = "desc">
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
          <p className="searching" key={0}>{desc}</p>
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
        } = this.props;
    return (
      <div className  = "Blue_SearchMobile">
          <div className="inputWarp">
              <input value = {value} onInput = {input} />
              <button onClick = {search}></button>
          </div>
          { isShow&&!isSearching&&
            <div className="myHistory">
              <h1>搜索记录</h1>
              <ul>
                {
                  myhistory.map((value,index)=>{
                    return(<li key = {index}>
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
                        <p className="emptyWarn">清空记录</p>
                      </div>
                  }else{
                    <p>目前还没有搜索记录!</p>
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
            <p className = 'searching'>正在搜索中....</p>
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
