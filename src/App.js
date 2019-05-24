import React, { Component } from 'react';
import { Route, HashRouter, Link } from "react-router-dom";
import { Layout } from 'antd';

import logo from './logo.svg';
import Home from './pages/Home.js'
import Bangumi from './pages/Bangumi.js'

import './App.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Layout>
          <Layout.Header>
            <Link to="/">
              <img src={logo} className="App-logo" alt="logo" />
            </Link>
          </Layout.Header>
          <Layout.Content style={{ padding: '30px 50px 0' }}>
            <div style={{ background: '#fff', padding: '15px' }}>
              <Route exact path="/" component={Home}></Route>
              <Route path="/:id" component={Bangumi} />
            </div>   
          </Layout.Content>
          <Layout.Footer style={{ textAlign: 'center' }}>© clipwww.github.io</Layout.Footer>
        </Layout>        
      </HashRouter>    
    );
  }
}

export default App;
