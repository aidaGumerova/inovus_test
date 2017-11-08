import React, { Component } from 'react'
//import logo from './logo.svg'

import Header from './components/layout/Header.js'
import Home from './components/home/Home.js'
import List from './components/apple/AppleList.js'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header/>
          <div id='App-container' className='container'>
            <Route exact path={'/'} component={Home}></Route>
            <Route path={'/list'} component={List}></Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
