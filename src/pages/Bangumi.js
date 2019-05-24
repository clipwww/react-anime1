import React, { Component } from 'react';
import Axios from 'axios';
import { PageHeader, Collapse, Tag, Icon, Spin, Button } from 'antd';

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

  componentWillReceiveProps({ match }) {
    this.setState({
      id: match.params.id
    })
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
    const { title, isLoading, bangumiList } = this.state;
    const listItem = bangumiList.map(item => {
      let content;
      
      switch(item.type) {
        case 'mp4':
          content = (
            <div className="video-wrapper" style={{ marginBottom: '15px' }}>
              <video controls>
                <source src={`https://clipwww-nuxt-express-project.herokuapp.com/api/anime1/download/mp4?url=${item.mp4Url}`} type="video/mp4"></source>
              </video>
            </div>
          )
          break;
      }

      return (
        <Collapse.Panel key={item.id}
          header={<div><Tag color={item.type === 'm3u8' ? "#f50" : "#2db7f5" }>{item.type}</Tag>{item.name}</div>}>
          {content}
          <a href={`https://clipwww-nuxt-express-project.herokuapp.com/api/anime1/download/${item.type}?url=${item.m3u8Url || item.mp4Url}`} target="_blank" download>
            <Button type="ghost" icon="download" size="large">下載</Button>
          </a>
        </Collapse.Panel>
      )
    })

    return (
      <Spin spinning={isLoading}>
        <PageHeader onBack={() => window.history.back()} title={title} subTitle={<Icon type="redo" onClick={this.fetchData} />}>
          <Collapse>
            {listItem}
          </Collapse>
        </PageHeader>
      </Spin>
    )
  }
}

export default Bangumi;