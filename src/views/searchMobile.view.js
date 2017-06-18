import React from 'react';
import { getImgURL,config } from '../libs/public';
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
// 返回頂部組件


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
          isSearching,
					isUpdateing
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
					{isUpdateing&&
						<div className='searching' style={{marginTop:0}}>
							<img className ="searchImg" src={config.ourHost + "/resource/images/" + 'loading.gif'} />
							<p className = 'fontSizeM'>正在加載中....</p>
						</div>
					}
					{!isShow&&!isSearching&&
							<footer className = "fontSizeSS">
											蓝山车队小组制作
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

// 翻页组件
class Blue_PT_LI extends React.Component{
	_create(){
		let items=[],
			  i,
				{ click,start,showNum,index,sum } = this.props;
		for(i = start;i <= showNum+start-1;i++) {
			if(i <= showNum + start - showNum+1 && showNum + start > showNum+1 ){
				if(i == showNum + start - showNum+1 ) {
					items.push(
						<li onClick={click}
							 className="item" key={i}
							 data-index={false}
							 className={""}>
							...
						</li>);
				}
				if(i == showNum + start - showNum){
					items.push(
						<li onClick={click}
							 className="item" key={1}
							 data-index={1}
							 className={""}>
							{1}
						</li>);
				}
			}
			else if( i >=  showNum + start-2 && showNum + start <= sum) {
				if(i == showNum + start-2) {
					items.push(
						<li onClick={click}
							 className="item" key={i}
							 data-index={false}
							 className={""}>
							...
						</li>);
				}
				if(i == showNum + start-1){
					items.push(
						<li onClick={click}
							 className="item" key={sum}
							 data-index={sum}
							 className={""}>
							{sum}
						</li>);
				}
			}
			else{
				items.push(
					<li onClick={click}
						 className="item" key={i}
						 data-index={i}
						 className={i==index?"cur":""}>
						{i}
					</li>);
			}
		}
		return items;
	}
	render(){
		return (
			<ul id="warp">
				{this._create()}
			</ul>
		);
	}
}
class Blue_PT extends React.Component{
	render(){
		let {sum,index,start,showNum,last,next,click } = this.props;
		if( showNum > sum){
			showNum = sum;
		}
		return(
			<div >
				{sum>1&&
				<div id="turnPageWarp">
					<div className={"BluMUI_PT"}>
						<button id='lastPage' onClick={last} className="last"></button>
						<Blue_PT_LI sum={sum}
											click = {click}
										  showNum={showNum}
										  index={index}
										  start={start}
						/>
						<button id="nextPage" onClick={next} className="next"></button>
					</div>
				</div>
				}
			</div>
		);
	}
}
class Blue_Container extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let {searchState , PtState , searchDispatch } = this.props;
        return(
            <div className="Blue_Container">
                <header >
                    <Blue_Top/>
                </header>
                <Blue_SearchMobile {...searchState} {...searchDispatch}/>
								{searchState.showTop&&
									<button className="backTopBtn" onClick = {searchDispatch.toTop }></button>
								}
            </div>
        );
    }
}
module.exports = {
    Blue_Container:Blue_Container
};
