import React, { Component } from 'react';
import { Link, HashRouter } from 'react-router-dom';
import { List, Icon } from 'antd'
import Axios from 'axios';


class Home extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      animeList: [],
    }

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount');

    const anime1 = JSON.parse(window.localStorage.getItem('anime1') || null);
    if (anime1 && Math.abs(anime1.timestamp - (+new Date())) < 1000 * 60 ) {
      this.setState({
        animeList: anime1.items
      })
    } else {
      this.fetchData();
    }

  }

  async fetchData() {
    this.setState({
      isLoading: true
    })

    const { data } = await Axios.get('https://clipwww-nuxt-express-project.herokuapp.com/api/anime1/list');
    console.log('[Anime1 List]', data);
    this.setState({
      isLoading: false
    })
    if (!data.success) {
      return;
    }

    window.localStorage.setItem('anime1', JSON.stringify({
      timestamp: +new Date(),
      items: data.items
    }))

    this.setState({
      animeList: data.items
    })
  }

  render() {
    const { animeList, isLoading } = this.state;

    return (
      <HashRouter>
        <List
          header={<h1 style={{ margin: 0 }}>Anime1動畫列表 <Icon type="redo" onClick={this.fetchData} /></h1>}
          bordered
          pagination
          loading={isLoading}
          dataSource={animeList}
          renderItem={item => (
            <List.Item actions={[
              <Link to={{ pathname: `/${item.id}/`, search: `?title=${item.name}` }}>
                <Icon type="info-circle" theme="filled" style={{ fontSize: '16px' }} />
              </Link>]}>
              {item.name}
            </List.Item>
          )}>

        </List>
      </HashRouter>
    )
  }
}

export default Home;