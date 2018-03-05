import React, {Component} from 'react';
import {getLatest} from 'api/index';
import MHeader from "common/m-header/m-header";
import Banner from "common/banner/banner";

class Index extends Component {
  // banner 上的热门

  state = {
    topList: []
  };

  componentWillMount() {
    getLatest()
      .then((response) => {
        this.setState({
          topList: response.top_stories
        });
      })
      .catch((error) => {
        console.error('内部错误，错误原因: ' + error);
      })
  }

  render() {
    return (
      <div>
        <MHeader title='首页'/>
        <Banner topList={this.state.topList}/>
      </div>
    );
  }
}

export default Index;