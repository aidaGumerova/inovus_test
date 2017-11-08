import React, { Component } from 'react'

class Home extends Component {

  componentDidMount() {
    document.title = 'Главная';
  }

  render() {
    return (
      <h1> Hello, it`s Main Page!</h1>
    )
  }
}

export default Home;