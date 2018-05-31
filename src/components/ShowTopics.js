import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
class ShowTopics extends Component {
  state = {
    topics: []
  }
  getTopics = tab => {
    const uri = `https://cnodejs.org/api/v1/topics?tab=${tab}`
    axios.get(uri).then(res => {
      this.setState({
        topics: res.data.data
      })
    })
  }
  getTab = tab => {
    switch (tab) {
      case 'ask': return '问答';
      case 'share': return '分享';
      case 'job': return '招聘';
      default: return null
    }
  }
  componentDidMount() {
    // 第一次组件出来的时候会执行,之后不会再次执行,用来初始化一些数据
    const { tab } = this.props
    this.getTopics(tab)
  }

  componentWillReceiveProps(nextProps) {
    // 组件将要改变 props 的时候 这个生命周期函数将会被触发 xxx 这个函数被 nextProps 是将要被更新的props
    // 当组件需要接收props的时候,这个生命周期函数会执行
    const { tab } = nextProps
    this.getTopics(tab)
  }


  render() {
    const { topics } = this.state
    console.log(topics);
    const goodStyle = {
      color: '#fff',
      backgroundColor: '#80bd01'
    }
    const badStyle = {
      color: '#000',
      backgroundColor: '#ccc'
    }
    const topicList = topics.length === 0 ? '请稍等' : topics.map(topic => <List key={topic.id}>
      <Link to={`/user/${topic.author.loginname}`}><img src={topic.author.avatar_url} alt="" /></Link>
      <Qb>
        <span title="回复数">{topic.reply_count}</span>/
      <span title="浏览量">{topic.visit_count}</span>
      </Qb>
      <Btn style={topic.top || topic.good ? goodStyle : badStyle}>
        {topic.top ? '置顶' : topic.good ? '精华' : this.getTab(topic.tab)}
      </Btn>
      <h3><Link to={{
        pathname: `/topic/${topic.id}`,
        // state: topics.find(t => t.id === topic.id)
      }}>{topic.title}</Link></h3>
    </List>)
    return (
      <div>
        {topicList}
      </div>
    );
  }
}

export default ShowTopics;
const List = styled.div`
display: flex; 
padding:10px;
align-items:center;
background-color:#fff;
h3{
  margin:0 15px;
  font-weight:normal;
  font-size:15px;
  margin-left:15px;
  flex-grow:1;
  overflow: hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
  a{
    color:#000;
  }
}
h3 a:visiter{
  color:#ccc;
}
h3 a:hover{
  text-decoration:underline;
}
span{
  font-size:14px;
}
img{
  width: 40px;
  height:40px;
  margin-right:40px;
  cursor:pointer;
}
&:hover{
  background-color:#f6f6f6;
}
`
const Btn = styled.span`
padding:2px 4px;
font-size: 12px;
margin-left:10px;
`
const Qb = styled.div`
  width:80px;
`