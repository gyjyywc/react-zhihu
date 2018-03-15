import React, {Component} from 'react';
import {getLatest} from 'api/index';
import MHeader from 'common/m-header/m-header';
import Banner from 'common/banner/banner';
import ListView from 'common/list-view/list-view';
import './index.styl'

class Index extends Component {
  state = {
    newsId: 0,
    bannerData: {
      topList: [],
      history: {},
      emit: {}
    },
    listViewData: {
      viewList: [],
      date: 0,
      history: {},
      emit: {}
    },
  };

  componentWillMount() {
    getLatest()
      .then((response) => {
        this.setState({
          bannerData: {
            topList: response.top_stories,
            history: this.props.history,
            emit: Index.handleEmit
          },
          listViewData: {
            viewList: response.stories,
            date: response.date,
            history: this.props.history,
            emit: Index.handleEmit
          }
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
            <Banner bannerData={this.state.bannerData} />
          </div>
        </div>
        <ListView listViewData={this.state.listViewData} />
      </div>
    );
  }
}

export default Index;