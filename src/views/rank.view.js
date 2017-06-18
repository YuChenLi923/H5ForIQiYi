import React from 'react';
import { config } from '../libs/public';
import RankList from './Rank_lists.view';

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
            <div className = "maxWarp fontSizeM">
              <a href="../index.html"><span className="logo"></span></a>
              <span>排行榜</span>
               <div className = "search">
                  <input placeholder = "请输入你想搜索的内容" onInput = {input} onKeyPress = {keyPress}/>
                  <button onClick = {search} ></button>
               </div>
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
        let { topDisPatch,
            } = this.props;
        return(
            <div className="Blue_Container">
                <header>
                    <Blue_Top {...topDisPatch}/>
                </header>
                <div id = 'body'>
                  <RankList />
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
