import React from 'react';
import { getImgURL,config } from '../libs/ajax.public';
// 评分组件
class Blue_Score extends React.Component{
	_createStar(startNum,sum){
		let i,
			  len,
			  starList=[];
    if(startNum > sum)
      startNum = sum;
		for(i=0,len=sum;i<len;i++){
			starList.push(
				<span className={i < startNum?'star onstar':'star nostar'}
						key={i}
						data-key={i}>
				</span>
			);
		}
		return starList;
	}
	render(){
    let  { score } = this.props,
         sum = 5,
         startNum = Math.floor(score/2);
    return(
			<div className={'Blue_Score'}>
				{this._createStar(startNum,sum)}
        <span className = 'score fontSizeM'>{score}</span>
      </div>
    );
  }
}

// 顶部
class Blue_Top extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
      let { search,input } = this.props;
      return (
        <div className = "Blue_Top fontSizeM maxWarp">
              <a href="../index.html"><span className="logo"></span></a>
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
          <Blue_Score score ={+score||0}></Blue_Score>
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
					keyPress,
          isSearching
        } = this.props,
        that = this;
    return (
      <div className  = "Blue_SearchMobile">
					<div className="searchWarp">
          	<div className="inputWarp maxWarp">
              	<input className = "fontSizeL" value = {value} onInput = {input}  onKeyPress = {keyPress} />
              	<button onClick = {search}></button>
          	</div>
					</div>
          { isShow&&!isSearching&&
            <div className="myHistory">
							<div className="maxWarp">
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
						</div>
          }
          {do{
            if(!isShow&&!isSearching){
              <div className = "searchContent">
								<div className = "maxWarp">
                {
                  this._creatCards(items,desc)
                }
								</div>
              </div>
            }
          }}
					{!isShow&&!isSearching&&
							<footer className = "fontSizeSS">
											蓝山工作室15级前端组制作
								</footer>
					}
          {
            isSearching&&
						<div className='searching' >
							<img className ="searchImg" src={config.ourHost + "/resource/images/" + 'loading.gif'} />
	            <p className = 'fontSizeM'>正在搜索中....</p>
						</div>
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
                <header >
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
