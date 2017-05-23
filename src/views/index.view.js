import React from 'react';
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
                    key={i} className={index === i?'on':'off'}
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
              <div className = "list maxWarp" style = {{height:isOn?Math.ceil(len/showLen)*20+'px':'40px'}}>
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
				<ul className="body"
					 style={{
					 	left:-1*index*width+"px",
					 	width:len*width+'px'}}>
					{bodyShow}
				</ul>
				<div className="nav">
					<ul className="control" >
            {do{
              if(width>768){
                <button onClick={clickLast}
								        className="last">
						    </button>}
            }}
						<ul className="showNav">
							{navShow}
						</ul>
            {do{
              if(width>768){
  						  <button onClick={clickNext}
  							 	    className="next">
  					  	</button>
              }
            }}
					</ul>
				</div>
			</div>
		)
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
        let { CarouseDispatch , NavListDispatch ,NavListState , CarouselState } = this.props;
        return(
            <div className="Blue_Container">
                <header>
                    <Blue_Top/>
                    <Blue_NavList {...NavListState}  {...NavListDispatch} />
                </header>
                <Blue_Carousel {...CarouselState} {...CarouseDispatch}/>
                <section id = 'body'>
                </section>
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
