import React, {Component} from 'react';
import {getLatest} from 'api/index';
import MHeader from 'common/m-header/m-header';
import Banner from 'common/banner/banner';
import ListView from 'common/list-view/list-view';
import './index.styl'

class Index extends Component {
  // banner 上的热门

  state = {
    topList: [],
    storyList: [],
    date: '',
    newsId: 0
  };

  componentWillMount() {
    getLatest()
      .then((response) => {
        this.setState({
          topList: response.top_stories,
          storyList: response.stories,
          date: response.date
        });
      })
      .catch((error) => {
        console.error('内部错误，错误原因: ' + error);
      })
  }

  static handleEmit(newsItem, history) {
    history.push('/news/' + newsItem.id);
  }

  render() {
    return (
      <div>
        <MHeader title='首页' />
        <div className="slider-wrapper">
          <div className="slider-content">
            <Banner
              topList={this.state.topList}
              history={this.props.history}
              emit={Index.handleEmit} />
          </div>
        </div>
        <ListView
          viewList={this.state.storyList}
          date={this.state.date}
          emit={Index.handleEmit}
          history={this.props.history}/>
      </div>
    );
  }
}

export default Index;