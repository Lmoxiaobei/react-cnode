import React, { Component } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import axios from 'axios'
class Header extends Component {
  state = {
    text: '',
    userInfo: null
  }
  componentDidMount() {
    // 组件在登陆后再次刷新的时候使用这个生命周期函数
    const accesstoken = sessionStorage.accesstoken
    if (accesstoken) {
      const uri = `https://cnodejs.org/api/v1/accesstoken`
      axios
        .post(uri, { accesstoken: accesstoken })
        .then(res => {
          sessionStorage.accesstoken = accesstoken
          this.setState({
            userInfo: res.data
          })
        })
    }
  }

  handleInput = e => {
    this.setState({
      text: e.target.value
    })
  }
  handleLogin = () => {
    const { text } = this.state
    if (text.trim()) {
      const uri = `https://cnodejs.org/api/v1/accesstoken`
      axios
        .post(uri, { accesstoken: text })
        .then(res => {
          console.log(res.data);
          sessionStorage.accesstoken = text
          sessionStorage.loginname = res.data.loginname

          this.setState({
            text: '',
            userInfo: res.data
          })
        })
        .catch(err => {
          alert('密码错误')
        })
    }
  }
  handelLogout = () => {
    this.setState({
      userInfo: null
    })
    sessionStorage.removeItem('accesstoken')
    sessionStorage.removeItem('loginname')
  }
  render() {
    const { userInfo, text } = this.state
    console.log(text);
    return (
      <Head>
        <Top>
          <Link to='/'>
            <img src="//o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="" style={{ width: '150px', margin: '10px' }} />
          </Link>
          {userInfo ? <div>
            <img src={userInfo.avatar_url} alt="" />
            <Ql onClick={this.handelLogout}>退出</Ql>
          </div> : <div>
              <input type="text" value={text} onChange={this.handleInput} />
              <Ql onClick={this.handleLogin}>登录</Ql>
              <Link to='/topic/create'><Ql>发布信息</Ql></Link>
            </div>}
        </Top>
      </Head>
    );
  }
}

export default Header;
const Head = styled.div`
  background-color:#3e3e3e;
  display:flex;
  width:100%;
  align-items: center;
`;
const Top = styled.div`
  width:90%;
  margin:0 auto;
  display: flex;  justify-content: space-between;
`
const Ql = styled.span`
color:#fff;
margin-left:10px;
`