import React, {
  PureComponent
} from 'react';
import { List, message, Progress, Icon, Avatar, notification } from 'antd';
import reqwest from 'reqwest';

import InfiniteScroll from 'react-infinite-scroller';

import {getAllData} from '../services/API/blockAPI';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

class BlockFeed extends React.Component {
  state = {
    data: [],
    loading: false,
    hasMore: true,
    status: ""
  }
  
  getData = (callback) => {
    let that = this;
    getAllData().then(response => {
      console.log(response)

      if(response !== that.state.data){
        that.setState({data: response.reverse()});
      }
      that.getData();

    }).catch(error => {
      console.log(error);
      return error;
    });
  }

  componentWillMount() {
    this.getData((res) => {
      this.setState({
        data: res.results,
      });
    });
  }
  handleInfiniteOnLoad = () => {
    let data = this.state.data;
    this.setState({
      loading: true,
    });
    if (data.length > 100) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    
  }
  render() {
    return (
      <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={this.state.hasMore}
          useWindow={false}
          threshold={0}
        >
          {!this.state.loading && this.state.hasMore && <Progress percent={100} status="active" showInfo={false} />}  
          <List
            dataSource={this.state.data}
            renderItem={item => (
              <List.Item key={item.ID}>
                <List.Item.Meta
                  avatar={<Avatar shape="square" size="large" style={{ backgroundColor: '#e00000'}} icon={'heart-o'} />}
                  title={"Heart Rate for ID: "+item.Value.id}
                  description={"Timestamp: " + (new Date(item.Timestamp).toLocaleString())}
                />
                <div>{"Heart Rate: " + item.Value.heartRate + " " + item.Value.unit}</div>
              </List.Item>
            )}
          >
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}

export default BlockFeed;