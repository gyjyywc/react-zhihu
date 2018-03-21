import React, {Component} from 'react';
import {getLatest} from 'api/index';
import MHeader from 'common/m-header/m-header';
import Banner from 'common/banner/banner';
import ListView from 'common/list-view/list-view';
import Scroll from 'common/scroll/scroll';
import './index.styl'

class Index extends Component {
  state = {
    newsId: 0,
    bannerData: {
      topList: []
    },
    listViewData: {
      viewList: [],
      date: 0
    },
    BScroll: {
      scrollToEnd: {}
    }
  };

  // 设置静态 history 方便子组件传回来
  static history;

  componentWillMount() {
    Index.history = this.props.history;
    getLatest()
      .then((response) => {
        this.setState({
          bannerData: {
            topList: response.top_stories
          },
          listViewData: {
            viewList: response.stories,
            date: response.date
          }
        });
      })
      .catch((error) => {
        console.error('内部错误，错误原因: ' + error);
      });
    this.setState({
      BScroll: {
        scrollToEnd: Index.scrollToEnd
      }
    });
  }

  static handleEmit(newsItem, history) {
    history.push('/news/' + newsItem.id);
  }

  static scrollToEnd() {
    console.log(11)
  }

  render() {
    return (
      <div>
        <MHeader title='首页' />
        <Scroll data={this.state.listViewData.viewList} BScroll={this.state.BScroll}>
          <div className="slider-wrapper">
            <div className="slider-content">
              <Banner bannerData={this.state.bannerData} />
            </div>
          </div>
          <ListView listViewData={this.state.listViewData} />
        </Scroll>
      </div>
    );
  }
}

export default Index;