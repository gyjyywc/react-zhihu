import React, {Component} from 'react';
import {getLatest} from 'api/index';
import MHeader from "common/m-header/m-header";
import Banner from "common/banner/banner";

class Index extends Component {
  // banner 上的热门
  topList = [];

  componentWillMount() {
    getLatest()
      .then((response) => {
        this.topList = response.top_stories;
        console.log(this.topList)
      })
      .catch((error) => {
        console.error('内部错误，错误原因: ' + error);
      })
  }

  render() {
    return (
      <div>
        <MHeader title='首页'/>
        <Banner />
      </div>
    );
  }
}

export default Index;