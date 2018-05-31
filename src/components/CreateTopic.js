import React, { Component } from 'react';
import axios from 'axios'
class CreateTopic extends Component {
  state = {
    title: '',
    content: ''
  }
  handleChange = (text, e) => {
    this.setState({
      [text]: e.target.value
    })
  }
  handelSubmit = () => {
    const { title, content } = this.state
    if (title.trim().length >= 7 && content.trim()) {
      const contentObj = {
        accesstoken: sessionStorage.accesstoken,
        title: title,
        content: content,
        tab: 'dev'
      }
      const uri = 'https://cnodejs.org/api/v1/topics'
      axios.post(uri, contentObj).then(res => {
        this.setState({
          title: '',
          content: ''
        })
        this.props.history.push(`/topic/${res.data.topic_id}`)
      })
    } else {
      alert('输入不正确')
    }
  }
  render() {
    const { title, content } = this.state
    console.log(title, content);
    return (
      <div>
        <input type="text" value={title} onChange={e => this.handleChange('title', e)} />
        <textarea value={content} onChange={e => this.handleChange('content', e)}></textarea>
        <button onClick={this.handelSubmit}>摁扭</button>
      </div>
    );
  }
}

export default CreateTopic;