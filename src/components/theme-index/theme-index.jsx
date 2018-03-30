import React, {Component} from 'react';
import MHeader from 'common/m-header/m-header';
import ListView from 'common/list-view/list-view';
import Scroll from 'common/scroll/scroll';
import Loading from 'common/loading/loading'
import Sidebar from 'common/sidebar/sidebar'
import {getThemeNews} from 'api/index';
import {prefixStyle} from "assets/js/utils";
import {sidebarClickIn, sidebarClickOut} from "assets/js/common";
import './theme-index.styl'

class themeIndex extends Component {

  state = {
    themeData: [],
    editors: [],
    bannerImg: '',
    headerTitle: '',
    description: '',
    newsId: 0,
    listViewData: {
      viewList: [],
      handleClick: {}
    },
    scrollEvent: {
      scrollToEnd: {},
    }
  };

  static transform = prefixStyle('transform');
  static listenScrollRealTime = 3;
  static animationDelay = 200;
  static scrollDistance = 60;
  static scrollAnimationDuration = 700;

  componentWillMount() {
    getThemeNews(this.props.match.params.themesId)
      .then((response) => {
        this.setState({
          themeData: response.stories,
          listViewData: {
            viewList: response.stories.slice(0, 20),
            handleClick: this.handleEmit.bind(this),
          },
          editors: response.editors,
          bannerImg: response.image,
          headerTitle: response.name,
          description: response.description,
        });
        Loading.hideLoading('loadingWrapper');
        document.getElementById('listLoading').style.display = 'block';
      })
      .catch((error) => {
        console.error('内部错误，错误原因: ' + error);
      });

    this.setState({
      scrollEvent: {
        // 不 bind this 就无法再函数里使用指向 ProxyComponent 的 this 关键字
        scrollToEnd: this.scrollToEnd.bind(this),
      }
    });
  }

  handleClickOfMHeader() {
  }

  handleDoubleClick() {
  }

  handleEmit(newsItem) {
    this.props.history.push('/news/' + newsItem.id);
  }

  scrollToEnd() {
    console.log('到底啦!');
    // getPreviousNews(this.state.nowDate)
    //   .then((response) => {
    //     // 简单 alert 一下好了，一般没人能坚持翻到 2013 年吧。
    //     if (response.date === '20130520') {
    //       return alert('没有更多消息了');
    //     } else {
    //       this.setState({
    //         nowDate: response.date,
    //         listViewData: {
    //           // 数据封装成 result 风格
    //           viewList: this.state.listViewData.viewList.concat([{date: response.date}].concat(response.stories)),
    //           handleClick: this.handleEmit.bind(this),
    //         }
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('内部错误，错误原因: ' + error);
    //   });
  }

  render() {
    return (
      <div>
        <MHeader title={this.state.headerTitle}
                 icon="icon-add"
                 emitClick={this.handleClickOfMHeader.bind(this)}
                 emitDoubleClick={this.handleDoubleClick.bind(this)} />
        <Scroll className="list-scroll"
                id="listScroll"
                ref="listScroll"
                probeType={themeIndex.listenScrollRealTime}
                scrollEvent={this.state.scrollEvent}>
          <div className="slider-wrapper" id="sliderWrapper">
            <div className="slider-content">
              hello world!
            </div>
          </div>
          <div id="listViewWrapper"
               ref="listViewWrapper"
               onTouchStart={(e) => {
                 this.handleListViewWrapperTouchStart(e);
               }}
               onTouchMove={(e) => {
                 this.handleListViewWrapperTouchMove(e);
               }}
               onTouchEnd={() => {
                 this.handleListViewWrapperTouchEnd();
               }}>
            <ListView listViewData={this.state.listViewData} />
          </div>
          <div className="list-loading" id="listLoading">
            <Loading title="" />
          </div>
        </Scroll>
        <div className="loading-wrapper" id="loadingWrapper">
          <Loading />
        </div>
        {/*<div className="sidebar-wrapper"*/}
        {/*id="sidebarWrapper"*/}
        {/*ref="sidebarWrapper"*/}
        {/*onTouchStart={(e) => {*/}
        {/*this.handleSidebarTouchStart(e);*/}
        {/*}}*/}
        {/*onTouchMove={(e) => {*/}
        {/*this.handleSidebarTouchMove(e);*/}
        {/*}}*/}
        {/*onTouchEnd={() => {*/}
        {/*this.handleSidebarTouchEnd();*/}
        {/*}}*/}
        {/*onClick={(e) => {*/}
        {/*this.handleClickOfSidebar(e);*/}
        {/*}}>*/}
        {/*<Sidebar themeData={this.state.themeData} emitClick={this.handleSidebarClick.bind(this)} />*/}
        {/*</div>*/}
      </div>
    );
  }
}

export default themeIndex;