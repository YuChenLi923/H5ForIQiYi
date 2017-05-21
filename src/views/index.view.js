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
      this.props.dispatch({
        type:'clickBtn'
      });
    }
    render(){
        let { items,index,callback,isOn,showLen} = this.props;
        let len = items.length;
        return (
            <nav className="Blue_NavList" >
              <div className = "list maxWarp" style = {{height:isOn?Math.ceil(len/showLen)*22+'px':'44px'}}>
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
	constructor(props){
		super(props);
		this.clickNav=this.clickNav.bind(this);
		this.clickNext=this.clickNext.bind(this);
		this.clickLast=this.clickLast.bind(this);
		this.changIndex=this.changIndex.bind(this);
		this.carouselAnimation=this.carouselAnimation.bind(this);
		this.mouseOffHandel=this.mouseOffHandel.bind(this);
		this.mouseOverHandel=this.mouseOverHandel.bind(this);
		this.state={
			index:this.props.index,
			left:-1*this.props.index*this.props.width,
			animation:false,
			mouse:false
		};
	}
	componentWillMount(){
		var that=this;
		this.timerID=setInterval(
			function(){
				if(!that.state.animation&&!that.state.mouse){
					that.changIndex(that.state.index+1);
					that.carouselAnimation(-1*that.props.width);
				}
			},
			that.props.setIntervalTime
		);
	}
	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	clickLast(){
		if(this.state.animation==false){
			this.changIndex(this.state.index-1);
			this.carouselAnimation(this.props.width);
		}
	}
	clickNext(){
		if(this.state.animation==false){
			this.changIndex(this.state.index+1);
			this.carouselAnimation(-1*this.props.width);
		}
	}
	clickNav(e){
		if(this.state.animation==false){
			var target=e.target,
				preIndex=this.state.index,
				nextIndex=parseInt(target.getAttribute("data-index")),
				dis=(nextIndex-preIndex)*this.props.width;
			this.changIndex(nextIndex);
			this.carouselAnimation(-1*dis);
		}
	}
	mouseOverHandel(){
		this.setState({
			mouse:true
		});
	}
	mouseOffHandel(){
		this.setState({
			mouse:false
		})
	}
	carouselAnimation(dis){
		var that = this,
			left = this.state.left,
			newpos = left + dis;
		if(newpos>0 && dis>0){
			left=((that.props.items.length-1) * that.props.width * -1);
			newpos=left ;
		}
		if(newpos<(this.props.width * (that.props.items.length-1) * (-1)) && dis<0){
			left=0;
			newpos=left;
		}
  	this.setState({
      left:newpos
    });
	}
	changIndex(nextIndex){
		if(nextIndex < 0){
			nextIndex = this.props.items.length-1;
		}
		if(nextIndex > this.props.items.length-1){
			nextIndex=0;
		}
		this.setState({index:nextIndex})
	}
	render(){
		var bodyShow=[],
			navShow=[],
			i,
			len;
		for(i= 0 ,len = this.props.items.length;i < len;i++){
			bodyShow.push(
				<li key={i}>
					<img  src={this.props.items[i].img}/>
				</li>
			);
			navShow.push(
				<li data-index={i}
					 key={i}
					 onClick={this.clickNav}
					 className={i==this.state.index?"on":"off"}>
				</li>);
		}
		return(
			<div onMouseOut={this.mouseOffHandel}
				   onMouseOver={this.mouseOverHandel}
				   className={"BluMUI_Carousel "}>
				<ul className="body"
					 style={{
					 	left:this.state.left+"px",
					 	width:(this.props.items.length+1)*this.props.width+'px'}}>
					{bodyShow}
				</ul>
				<div className="nav">
					<ul className="control" >
						<button onClick={this.clickLast}
								  className="last">
						</button>
						<ul className="showNav">
							{navShow}
						</ul>
						<button onClick={this.clickNext}
								  className="next">
						</button>
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
        let { dispatch , NavListState ,CarouselState } = this.props;
        return(
            <div className="Blue_Container">
                <header>
                    <Blue_Top/>
                    <Blue_NavList {...NavListState} dispatch = {dispatch} />
                </header>
                <Blue_Carousel {...CarouselState}/>
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
