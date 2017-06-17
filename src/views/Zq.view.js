import React from 'react';
import { ajaxExpanding } from '../libs/ajaxExpand.mini.min.js';
import { config , getImgURL , getScreenSize } from '../libs/ajax.public';
// 中间部分
ajaxExpanding.init({
  name:'getDetails',
  dataType:'json',
  type:'get',
  async:true,
  handleData:function (result) {
    return JSON.parse(result);
  }
});


// 加载组件

class Blue_Loading extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loadFail:false
    }
  }
  componentWillMount(){
    this.timerID = setTimeout(()=>{
      this.setState({
        loadFail:true
      })
    },5000);
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



class Page_body extends React.Component {
  constructor(props) {
    super(props);
    // this.create_body=this.create_body.bind(this);
    this.isMobile=getScreenSize().width<768;
    this.channel_name='';
    this.state={};
  }

  words_limit(str) {
    if(str.length>10) {
      return str.substring(0,10)+"...";
    } else {
      return str;
    }
  }

  create_body() {
    if(this.props.loading) {
      return <Blue_Loading text="正在加载内容"/>
    } else {
      if(this.props.nodata) {
        return <div id="detail_error">{this.props.error}</div>
      } else {
        if(this.isMobile) { //phone
          return <div id="details">
            {this.props.videos.map((e,index)=><div className="detail_item" key={index} style={{height:'340px'}}>
              <img src={getImgURL(e.img)} alt={e.title}/>
              <span  className="fontSizeS" title={e.title}>{this.words_limit(e.short_title)}</span>
            </div>)}
          </div>
        } else { //pc
          return <div id="pc_details">
            {this.props.videos.map((e,index)=><div className="detail_item" key={index}>
              <div>
                {e.is_vip=='1'?<img src="../resource/images/vip.png" className="pc_vip" />:''}
                <img src={getImgURL(e.img)} alt={e.title} className='pc_pic'/>
                <div className="pc_msg" style={{
                  width:'5.197rem',
                  height:'3.898rem',
                  position:'absolute',
                  top:'0.15rem',
                  // display:'none',
                  background:'rgba(150,150,150,0.6)'
                }}>
                  <span>播放量：{e.play_count_text}</span>
                </div>
              </div>
              <span  className="fontSizeS" title={e.title}>{this.words_limit(e.short_title)}</span>
            </div>)}
          </div>
        }
      }
    }
  }

  render() {
    // this.get_msg(this.props.Title);
    if(this.isMobile) {
      console.log("手机端");
    } else {
      console.log("PC端");
    }
    // console.log("ZQ:",this.props)
    return <div style={{background:'#FFF'}} id="zq_body">
      {this.create_body()}
    </div>
  }
}


module.exports = Page_body;
