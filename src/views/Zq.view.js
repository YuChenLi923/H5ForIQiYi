import React from 'react';
import { ajaxExpanding } from '../libs/ajaxExpand.mini.min.js';
import { config , getScreenSize } from '../libs/ajax.public';
// 中间部分
ajaxExpanding.init({
  name:'getDetails',
  dataType:'json',
  type:'get',
  async:false,
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
  data.channel_name = name;
  var back;
  ajaxExpanding.send({
    url:config.host + '/openapi/realtime/channel',
    data:data,
    onSuccess:result=>{
      console.log("result:\n",result)
      console.log(data)
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

    this.channel_name='';
  }
  get_msg() {
    let gets=get_msg(this.channel_name);
    console.log(gets);
  }
  componentDidMount() {
    this.get_msg();
  }
  render() {
    data.channel_name=this.props.Title;
    return <div style={{background:'blue',fontSize:'0.8rem'}}>{'props is:'+this.props.Title}</div>
  }
}
module.exports = Page_body;
