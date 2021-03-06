import React, { Component } from 'react';
import Axios from 'axios';
import { PageHeader, Collapse, Tag, Icon, Spin, Button } from 'antd';

import { logEvent } from '../utils/ga'

class Bangumi extends Component {
  constructor({ match, location }) {
    super()
    const query = new URLSearchParams(location.search);

    this.state = {
      id: match.params.id,
      title: query.get('title'),
      bangumiList: [],
      isLoading: false,
    }

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    this.setState({
      isLoading: true,
    })
    
    const { data } = await Axios.get(`https://clipwww-nuxt-express-project.herokuapp.com/api/anime1/bangumi/${this.state.id}`);
    console.log('[Bangumi]', data);
    this.setState({
      isLoading: false,
    })

    if (!data.success) {
      return;
    }

    this.setState({
      bangumiList: data.items
    })
  }

  render() {
    const { id, title, isLoading, bangumiList } = this.state;
    const listItem = bangumiList.map(item => {
      let content;
      
      switch(item.type) {
        case 'mp4':
          content = (
            <div className="video-wrapper" style={{ marginBottom: '15px' }}>
              <video controls>
                <source src={`https://clipwww-nuxt-express-project.herokuapp.com/api/anime1/download/mp4?url=${item.mp4Url}`} type="video/mp4"></source>
              </video>
              <iframe src={item.mp4Url} ></iframe> 
            </div>
          )
          break;
        default:
          break;
      }

      return (
        <Collapse.Panel key={item.id}
          header={<div><Tag color={item.type === 'm3u8' ? "#f50" : "#2db7f5" }>{item.type}</Tag>{item.name}</div>}>
          {content}
          <a href={`https://clipwww-nuxt-express-project.herokuapp.com/api/anime1/download/${item.type}?url=${item.m3u8Url || item.mp4Url}`} 
          target="_blank" 
          download={item.name} 
          onClick={() => logEvent('Download Click', item.name)}>
            <Button type="ghost" icon="download" size="large">下載</Button>
          </a>
        </Collapse.Panel>
      )
    })

    return (
      <Spin spinning={isLoading}>
        <PageHeader onBack={() => window.history.back()} title={title} subTitle={<Icon type="redo" onClick={() => { this.fetchData();logEvent('Reload Click', 'Fetch Data'); }} />}>
          <a href={`https://anime1.me/?cat=${id}`} target="_blank">原始連結</a>
          <Collapse>
            {listItem}
          </Collapse>
        </PageHeader>
      </Spin>
    )
  }
}

export default Bangumi;