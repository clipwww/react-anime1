import React, { useState, useEffect } from 'react';
import { Route, HashRouter, Link } from "react-router-dom";
import { Layout } from 'antd';

import logo from './logo.svg';
import Home from './pages/Home.js'
import Bangumi from './pages/Bangumi.js'

import './App.css';

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    function onMouseMove(e) {
      setPosition({
        x: e.offsetX,
        y: e.offsetY
      })
    }
    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    }
  })

  return (
    <HashRouter>
      <Layout>
        <Layout.Header>
          <Link to="/">
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
        </Layout.Header>
        <Layout.Content style={{ padding: '30px 15px 0' }}>
          <div style={{ background: '#fff', padding: '15px', maxWidth: '600px', margin: '0 auto' }}>
            <Route exact path="/" component={Home}></Route>
            <Route path="/:id" component={Bangumi} />
          </div>   
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>x:{position.x} y:{position.y} © clipwww.github.io</Layout.Footer>
      </Layout>        
    </HashRouter>    
  );
}

export default App;
