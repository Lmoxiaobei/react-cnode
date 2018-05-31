import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
class ShowTopic extends Component {
  state = {
    topic: null,
    is_collects: false,
    comment: ''
  }
  getTopic = () => {
    const { id } = this.props.match.params
    const { accesstoken } = sessionStorage
    const params = accesstoken ? `?accesstoken={accesstoken}` : ''
    const uri = `https://cnodejs.org/api/v1/topic/${id}${params}`
    axios.get(uri).then(res => {
      this.setState({ topic: res.data.data, is_collects: accesstoken ? res.data.data.is_collects : false })
    })
  }
  componentDidMount() {
    this.getTopic()
  }
  handelCollect = topic_id => {
    if (sessionStorage.accesstoken) {
      const { is_collects } = this.state
      const uriLast = is_collects ? 'de_collect' : 'collect'
      const uri = `https://cnodejs.org/api/v1/topic_collect/${uriLast}`
      axios.post(uri, { accesstoken: sessionStorage.accesstoken, topic_id })
        .then(res => {
          this.setState({
            is_collects: !is_collects
          })
        })
    }
  }
  handleComment = e => {
    this.setState({
      comment: e.target.value
    })
  }
  addComment = id => {
    const { comment } = this.state
    const uri = `https://cnodejs.org/api/v1/topic/${id}/replies`
    axios.post(uri, { accesstoken: sessionStorage.accesstoken, content: comment })
      .then(res => {
        this.setState({
          comment: ''
        })
        const { id } = this.props.match.params
        const { accesstoken } = sessionStorage
        const params = accesstoken ? `?accesstoken=${accesstoken}` : ''
        const uri = `https://cnodejs.org/api/v1/topic/${id}${params}`
        axios.get(uri).then(res => {
          this.setState({
            topic: res.data.data,
            is_collect: accesstoken ? res.data.data.is_collect : false
          })
        })
      })
  }
  handleUp = id => {
    const uri = `https://cnodejs.org/api/v1/reply/${id}/ups`
    axios.post(uri, { accesstoken: sessionStorage.accesstoken })
      .then(res => {
        this.getTopic()
      })
  }
  render() {
    const { topic, is_collects, comment } = this.state
    console.log(topic)
    const content = !topic ? (
      '请稍等'
    ) : (
        <div>
          {topic.top ? (
            <button>置顶</button>
          ) : topic.good ? (
            <button>精华</button>
          ) : (
                ''
              )}
          <h2>{topic.title}</h2>
          <p>
            ·作者{topic.author.loginname} ·浏览量{topic.visit_count}
          </p>
          <button onClick={() => this.handelCollect(topic.id)}>{is_collects ? '取消收藏' : '收藏'}</button>
          <hr />
          <Content dangerouslySetInnerHTML={{ __html: topic.content }} />
        </div>
      )
    const replayList = !topic ? (
      '请稍等'
    ) : (
        <div>
          {topic.replies.length === 0
            ? '评论为空'
            : topic.replies.map(reply => (
              <div key={reply.id}>
                <Link to={`/user/${reply.author.loginname}`}>
                  <img
                    style={{ width: '30px' }}
                    src={reply.author.avatar_url}
                    alt=""
                  />
                </Link>
                <span>{reply.author.loginname}</span>
                <p dangerouslySetInnerHTML={{ __html: reply.content }} />
                <span onClick={() => this.handleUp(reply.id)}>赞{reply.ups.length}</span>
              </div>
            ))}
        </div>
      )
    return (
      <div>
        {content}
        <div>
          <div>回复</div>
          {replayList}
        </div>
        <div>
          {sessionStorage.accesstoken ? (<div><h4>添加回复</h4>
            <textarea value={comment} onChange={this.handleComment}></textarea>
            <button onClick={() => this.addComment(topic.id)}>回复</button>
          </div>) : ('')
          }
        </div>
      </div>
    )
  }
}

export default ShowTopic

const Content = styled.div`
  img {
    width: 80%;
  }
  p {
    line-height: 30px;
  }
`