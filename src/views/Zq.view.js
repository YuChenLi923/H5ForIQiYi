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




class Page_body extends React.Component {
  constructor(props) {
    super(props);
    // this.create_body=this.create_body.bind(this);

    this.channel_name='';
    this.state={};
  }

  create_body() {
    if(this.props.nodata) {
      return <div id="detail_error">{this.props.error}</div>
    } else
      return <div id="details">
        {this.props.videos.map((e,index)=><div className="detail_item" key={index}>
          <img src={e.img} alt={e.title}/>
          <span  className="fontSizeSS" title={e.title}>{e.short_title}</span>
        </div>)}
      </div>
  }

  render() {
    // this.get_msg(this.props.Title);
    console.log("ZQ:",this.props)
    return <div style={{background:'yellow'}}>
      {this.create_body()}
    </div>
  }
}


module.exports = Page_body;
