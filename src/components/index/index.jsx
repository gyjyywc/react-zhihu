import React, {Component} from 'react';
import {getLatest} from 'api/index';
import MHeader from 'common/m-header/m-header';
import Banner from 'common/banner/banner';
import './index.styl'

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
        <MHeader title='首页' />
        <div className="slider-wrapper">
          <div className="slider-content">
            <Banner topList={this.state.topList} />
          </div>
        </div>
      </div>
    );
  }
}

export default Index;