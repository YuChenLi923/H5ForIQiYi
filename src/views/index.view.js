import React from 'react';
// 导航栏
class Blue_NavList extends React.Component{
    constructor(props){
        super(props);
        this._clickBtn = this._clickBtn.bind(this);
    }
    _click(item,index){
      var that = this,
          value = item.value || item.name;
      return function(){
          that.props.callback(value,index);
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
        let { dispatch , NavListState } = this.props;
        return(
            <div className="Blue_Container">
                <header>
                    <Blue_Top/>
                    <Blue_NavList {...NavListState} dispatch = {dispatch} />
                </header>
                <section className = 'body'>
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
