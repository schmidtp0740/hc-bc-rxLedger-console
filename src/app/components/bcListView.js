import React, {
  PureComponent
} from 'react';
import { List, message, Progress, Icon, Avatar, notification } from 'antd';
import reqwest from 'reqwest';

import InfiniteScroll from 'react-infinite-scroller';

import {getAllData, getStatus} from '../services/API/blockAPI';

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
    setTimeout(() => {
    getAllData().then(response => {
      console.log(JSON.stringify(response))

      if(response['rx'] !== that.state.data){
        that.setState({data: response['rx'].reverse()});
      }

      getStatus().then(response => {
        if (response.isHacked !== that.state.isHacked) {
          that.setState({ isHacked: response.isHacked });
          if (that.state.isHacked === "true") {
            notification.open({
              message: 'Blockchain Integrity Issue',
              duration: 0,
              description: 'There was an attempt to manipulate the blockchain. \nAttempt to add out of sequence block.',
              icon: <Icon type="warning" style={{ color: '#e8f1f5' }} />,
              style: {
                backgroundColor: '#D1B829',
                color: 'white'
              },
              key: "isHacked"
            });
          }
        }
      }).catch(error => {
        return error;
      });
      that.getData();

    }).catch(error => {
      console.log(error);
      return error;
    });
  }, 6000);
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
              <List.Item key={item.rxid}>
                <List.Item.Meta
                  avatar={<Avatar shape="square" size="large" style={item.status === 'prescribed' ? { backgroundColor: '#D1B829'} : { backgroundColor: '#307351'}} icon={item.status === 'prescribed' ? 'solution' : 'medicine-box'} />}
                  title={item.rxid}
                  description={"Timestamp: " + (new Date(item.timestamp).toLocaleString())}
                />
                <div>{"Status: " + item.status}</div>
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