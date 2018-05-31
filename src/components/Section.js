import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import Main from './Main';
import ShowTopic from './ShowTopic';
import User from './User';
import CreateTopic from './CreateTopic';
import Error from './Error';

class Section extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/' exact component={Main} />
          {/* 先匹配单一的路由,然后再次匹配带id的路由   switch的作用 */}
          <Route path='/topic/create' component={CreateTopic} />
          <Route path='/topic/:id' component={ShowTopic} />
          <Route path='/user/:username' component={User} />
          {/* 下面两条意思是重定向,把网址输入错误的直接调到路由404页面 */}
          <Route path='/404' component={Error} />
          <Redirect from="*" to="/404/" />
        </Switch>
      </div>
    );
  }
}

export default Section;