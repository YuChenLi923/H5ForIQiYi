import React from 'react';
import { ajaxExpanding } from '../libs/ajaxExpand.mini.min.js';
import { config , getImgURL , getScreenSize } from '../libs/public';
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
    },7000);
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

class Rank_lists extends React.Component {
  constructor(props) {
    super(props);
    this.isMobile=getScreenSize().width<768;
    this.state={
      datas:[],
      nodata:1
    }
  }
  componentWillMount() {
    var send_data=config.publicData;
    ajaxExpanding.init({
      url: config.host+'/openapi/realtime/recommend',
      data: send_data,
      dataType:'json',
      type:'get',
      async:true,
      handleData:(result)=>JSON.parse(result),
      onSuccess:(result)=>{
        var Ranks=[];
        result.data.map((e,index)=>{if(index>0) Ranks=Ranks.concat(e.video_list)})
        this.setState({
        nodata:0,
        datas:Ranks
      })}
    }).send();
  }
  words_limit(str) {
    var screenWidth = getScreenSize().width;

    if(screenWidth >= 1180 && str.length>15) {
      return str.substring(0,15)+"...";
    }else if(screenWidth >= 768 && screenWidth < 1180 && str.length > 10){
      return str.substring(0,15)+"...";
    }else if(screenWidth < 768 && str.length>7){
      return str.substring(0,7)+"...";
    }else {
      return str;
    }
  }
  render() {
    if(this.state.nodata) {
      console.log('a')
      return   <Blue_Loading text="正在加载"/>;
    } else {
      console.log("b")
      if(this.isMobile) {
        console.log('c')
        return <div id="phone_ranks" className="maxWarp">
          {
            this.state.datas.map((e,index)=>
            <div className="rank_item" key={index}>
              <img src={getImgURL(e.img)} alt={e.title}/>
              <div className="phone_msg">
                <span className="fontSizeS" title={e.title}>名称：{this.words_limit(e.short_title)}</span>
                <br/>
                <span className="fontSizeS">播放量：{e.play_count_text}</span>
                <br/>
                <span className="fontSizeS">类型：{e.is_vip=='1'?"VIP":"免费"}</span>
              </div>
            </div>)
          }
        </div>
      } else { //pc
        console.log('d')
        return <div id="pc_ranks" className="maxWarp">
          {
            this.state.datas.map((e,index)=>
            <div className="rank_item" key={index}>
              <div>
                {e.is_vip=='1'?<img src="../resource/images/vip.png" className="pc_vip" />:''}
                <img src={getImgURL(e.img)} alt={e.title} className='pc_pic'/>
                <div className="pc_msg" style={{
                  width:'5.197rem',
                  height:'3.898rem',
                  position:'absolute',
                  top:'0.15rem',
                  background:'rgba(150,150,150,0.6)'
                }}>
                  <span>播放量：{e.play_count_text}</span>
                </div>
              </div>
            <span  className="fontSizeS" title={e.title}>{this.words_limit(e.short_title)}</span>
            </div>)
        }
        </div>
      }
    }
  }
}

module.exports=Rank_lists;
