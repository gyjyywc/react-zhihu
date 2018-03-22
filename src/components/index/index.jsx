import React, {Component} from 'react';
import {getLatest, getPreviousNews} from 'api/index';
import MHeader from 'common/m-header/m-header';
import Banner from 'common/banner/banner';
import ListView from 'common/list-view/list-view';
import Scroll from 'common/scroll/scroll';
import './index.styl'

class Index extends Component {
  state = {
    newsId: 0,
    bannerData: {
      topList: [],
      handleClick: {}
    },
    listViewData: {
      viewList: [],
      date: [],
      handleClick: {}
    },
    scrollEvent: {
      scroll: {}
    },
    nowDate: 0
  };

  componentWillMount() {
    getLatest()
      .then((response) => {
        this.setState({
          bannerData: {
            topList: response.top_stories,
            handleClick: this.handleEmit.bind(this)
          },
          listViewData: {
            // 数据封装成 result 风格
            viewList: [{date: response.date}].concat(response.stories),
            handleClick: this.handleEmit.bind(this)
          },
          nowDate: response.date
        });
      })
      .catch((error) => {
        console.error('内部错误，错误原因: ' + error);
      });

    this.setState({
      scrollEvent: {
        // 不 bind this 就无法再函数里使用指向 ProxyComponent 的 this 关键字
        scroll: this.scroll.bind(this)
      }
    });
  }

  handleEmit(newsItem) {
    this.props.history.push('/news/' + newsItem.id);
  }

  scroll(pos, scroll) {
    if (pos.y <= scroll.maxScrollY - 20) {
      getPreviousNews(this.state.nowDate)
        .then((response) => {
          // 简单 alert 一下好了，一般没人能坚持翻到 2013 年吧。
          if (response.date === '20130520') {
            return alert('没有更多消息了');
          } else {
            this.setState({
              nowDate: response.date,
              listViewData: {
                // 数据封装成 result 风格
                viewList: this.state.listViewData.viewList.concat([{date: response.date}].concat(response.stories)),
              }
            });
          }
        })
        .catch((error) => {
          console.error('内部错误，错误原因: ' + error);
        });
    }
  }

  render() {
    return (
      <div>
        <MHeader title='首页' />
        <Scroll data={this.state.listViewData.viewList} scrollEvent={this.state.scrollEvent}>
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