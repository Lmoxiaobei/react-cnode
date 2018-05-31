import React, { Component } from 'react';
import styled from 'styled-components'
// import { Route } from 'react-router-dom'
import ShowTopics from './ShowTopics'
class Main extends Component {
  state = {
    tab: 'all'
  }
  handlelTab = tab => {
    this.setState({
      tab: tab
    })
  }

  render() {
    const tabs = [
      {
        tab: 'all',
        tabText: '全部'
      },
      {
        tab: 'good',
        tabText: '精华'
      },
      {
        tab: 'share',
        tabText: '分享'
      },
      {
        tab: 'ask',
        tabText: '问答'
      },
      {
        tab: 'job',
        tabText: '招聘'
      }
    ]

    const { tab } = this.state
    const tabList = tabs.map((tab, index) =>
      <Lq key={index}> <span style={this.state.tab === tab.tab ? { backgroundColor: '#80bd01', color: '#fff' } : {}} onClick={() => { this.handlelTab(tab.tab) }} >{tab.tabText}</span></Lq >
    )
    return (
      <div>
        <Wrapper>
          <nav>
            <Uq >
              {tabList}
            </Uq>
          </nav>
          <ShowTopics tab={tab} />
        </Wrapper>
      </div>
    );
  }
}

export default Main;
const Wrapper = styled.section`
background-color:#f6f6f6;
padding:10px 20px;
`

const Uq = styled.ul`
display: flex; 
align-items: center; 
list-style: none;
background-color:#fff;
padding:10px;

`
const Lq = styled.li`
&:hover{
  color:#005580;
};
margin: 0 10px;
color: #80bd01; 
cursor: pointer;
padding:10px;

span {
  padding:2px 4px;
}
`