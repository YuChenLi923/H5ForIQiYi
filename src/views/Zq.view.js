import React from 'react';
import { ajaxExpanding } from '../libs/ajaxExpand.mini.min.js';
import { config , getScreenSize } from '../libs/ajax.public';
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
var data = config.publicData;


function get_msg(name) {
  var data = config.publicData;
  data.type = 'detail';
  data.mode = 11;
  data.is_purchase = 2; //是否付费的片子
  data.version = 7.5;
  data.page_size = 30;
  console.log(name,999);
  data.channel_name = name;
  var back;
  ajaxExpanding.send({
    url:config.host + '/openapi/realtime/channel',
    data:data,
    onSuccess:result=>{
      back=result;
    }
  },
  'getDetails');
  return back;
}

class Page_body extends React.Component {
  constructor(props) {
    super(props);
    this.get_msg=this.get_msg.bind(this);
    this.preTitle = '';
  }
  get_msg() {
    if(this.props.Title){
      if(!this.preTitle){
        get_msg(this.props.Title);
        this.preTitle = this.props.Title;
      }
      else{
        if(this.preTitle != this.props.Title){
          get_msg(this.props.Title);
          this.preTitle = this.props.Title;
        }
      }
    }
  }
  render() {
    this.get_msg();
    console.log(this.props);
    return <div style={{background:'blue',fontSize:'0.8rem'}}>{'props is:'+this.props.Title}</div>
  }
}
module.exports = Page_body;
