import React, { Component } from 'react';
// import axios from 'axios'
import Header from './Header'
import Section from './Section'
import Footer from './Footer'
import { BrowserRouter as Router } from 'react-router-dom'
class App extends Component {
  // componentDidMount() {
  //   const uri = 'https://cnodejs.org/api/v1/accesstoken '
  //   // axios.get(uri).then(res => {
  //   //   console.log(res.data.data);
  //   // })
  //   axios.post(uri, { accesstoken: "d12252e5-503c-488b-839f-4e7441c6dafc" }).then(res => {
  //     console.log(res.data);
  //   })
  // }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Section />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;