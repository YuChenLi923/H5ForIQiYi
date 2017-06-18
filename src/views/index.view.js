import React from 'react';
import { config } from '../libs/public';
// 导航栏
class Blue_NavList extends React.Component{
    constructor(props){
        super(props);
        this._clickBtn = this._clickBtn.bind(this);
    }
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
                    key={i}
                    className='fontSizeS'
                >
                    {items[i].name}
                </a>
            );
        }
        return result;
    }
    _clickBtn(){
      this.props.clickBtn({
        type:'clickBtn'
      });
    }
    render(){
        let { items,index,callback,isOn,showLen} = this.props;
        let len = items.length;
        return (
            <nav className="Blue_NavList" >
              <div className = "list maxWarp" style = {{height:isOn?Math.ceil(len/showLen)*0.5+'rem':0.5+'rem'}}>
                {this._createList(items,index,callback)}
              </div>
              <div className = "dropBox">
                <button onClick = {this._clickBtn}
                        className = {isOn?'on':'off'}
                ></button>
              </div>
            </nav>
        );
    }
}
// 轮播图

class Blue_Carousel extends React.Component{
	render(){
		let bodyShow=[],
			  navShow=[],
			  i,
        { items,
          width,
          CarouseDispatch,
          index,
          clickLast,
          clickNext,
          clickNav,
          touchStart,
          touchEnd,
          mouseOut,
          mouseOver,
          height
        }  = this.props,
        len = items.length;
		for(i= 0;i < len;i++){
			bodyShow.push(
				<li key={i} style={{width:width+'px'}}>
					<img src={items[i].img}/>
          <span>{items[i].title}</span>
				</li>
			);
			navShow.push(
				<li data-index={i}
					 key={i}
					 onClick={clickNav}
					 className={i==index?"on":"off"}>
				</li>);
		}
		return(
			<div onMouseOut={mouseOut}
				   onMouseOver={mouseOver}
           onTouchStart = {touchStart}
           onTouchEnd = {touchEnd}
           style = {{height:height + 'px'}}
				   className={"BluMUI_Carousel "}>
        {
          do{
            if(len>0){
      				<ul className="body"
      					 style={{
      					  left:len>0?-1*index*width+"px":0,
      					 	width:len*width+'px'}}>
      					{bodyShow}
      				</ul>
            }else{
              <Blue_Loading text="正在加载内容"/>
            }
          }
        }
				<div className={len>0?'nav':''}>
					<ul className="control" >
						<ul className="showNav">
							{navShow}
						</ul>
					</ul>
				</div>
        { len>0&&
          <button onClick={clickNext}
                  className="next">
          </button>
        }
        { len>0&&
          <button onClick={clickLast}
                  className="last">
          </button>
        }
			</div>
		)
	}
}

// 内容卡片
class Blue_CardBox extends React.Component{
  _createItems(items){
    let i,
        len,
        result = [];
    for( i = 0 , len = items.length ; i < len ; i++){
      result.push(
        <div key ={i} className='card'>
          <a>
            <img  src={items[i].img} />
            {
              items[i].extText&&
              <span className = "extText fontSizeSS">{items[i].extText}</span>
            }
          </a>
          <span>{items[i].title}</span>
        </div>
      );
    }
    return result;
  }
  goto(id){
    return function(){
        window.location.href = './pages/pagination.html?type='+id;
    }
  }
  render(){
    let { card  } = this.props;
    return (
      <section className='Blue_CardBox fontSizeS'>
        <header className='header'>
          <span className='title fontSizeL' style={{backgroundImage:'url('+ config.ourHost + '/resource/images/title-'+card.id+'.png)'}}>{card.title}</span>
          <span className='more fontSizeL' onClick = {this.goto(card.id)}>更多</span>
        </header>
        <div className="cardWarp">
        {this._createItems(card.items)}
        </div>
      </section>
    );
  }
}

// 加载组件

class Blue_Loading extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loadFail:false
    }
  }
  componentWillMount(){
    let that = this;
    this.timerID = setTimeout(function(){
      that.setState({
        loadFail:true
      })
    },3000);
  }
  componentWillUnmount(){
    clearTimeout(this.timerID);
  }
  render(){
    let loadingText = this.props.text ||'';
    return(
      <div className = 'Blue_Loading'>
        {
          this.state.loadFail&&
          <img className = "failImg" src={config.ourHost + "/resource/images/" + 'fail.png'} />
        }
        {
          this.state.loadFail&&
          <p className = "fontSizeSS">加载失败,请重新刷新页面</p>
        }
        {
          !this.state.loadFail&&
          <img className = "lodingImg" src={config.ourHost + "/resource/images/" + 'loading.gif'} />
        }
        {
          !this.state.loadFail&&
          <p className = "fontSizeSS">{loadingText}</p>
        }
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
      let { search,input,keyPress } = this.props;
      return (
        <div className = "Blue_Top">
            <div className = "maxWarp">
              <a href="#"><span className="logo"></span></a>
               <div className = "search">
                  <input placeholder = "请输入你想搜索的内容" onInput = {input} onKeyPress = {keyPress}/>
                  <button onClick = {search} ></button>
               </div>
               <a href="pages/rank.html"><span className="fontSizeSS rank">
                排行榜
               </span>
               </a>
            </div>
        </div>
      );
  }
}
class Blue_Container extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let { CarouseDispatch,
              NavListDispatch,
              topDisPatch,
              NavListState,
              CarouselState,
              CardsState
            } = this.props;
        return(
            <div className="Blue_Container">
                <header>
                    <Blue_Top {...topDisPatch}/>
                    <Blue_NavList {...NavListState}  {...NavListDispatch} />
                </header>
                <Blue_Carousel {...CarouselState} {...CarouseDispatch}/>
                <div id = 'body'>
                  {do{
                    if(CardsState.cards.length > 0){
                      CardsState.cards.map((card,index)=>{
                        return <Blue_CardBox card = {card} key={index}/>
                      });
                    }
                  }}

                </div>
                <footer className = "fontSizeSS">
                    蓝山车队小组制作
                </footer>
            </div>
        );
    }
}
module.exports = {
    Blue_Container:Blue_Container
};
