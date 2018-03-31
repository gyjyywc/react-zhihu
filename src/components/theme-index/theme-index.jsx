import React, {Component} from 'react';
import MHeader from 'common/m-header/m-header';
import ListView from 'common/list-view/list-view';
import Scroll from 'common/scroll/scroll';
import Loading from 'common/loading/loading'
import Sidebar from 'common/sidebar/sidebar'
import {getThemeNews, getThemes} from 'api/index';
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
          // themeData: response.stories,
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

    getThemes()
      .then((response) => {
        this.setState({
          themeData: response.others
        });
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
    // 为了引发 scroll 中 state 的变化，从而使得 scroll refresh
    this.setState({
      scrollRefresh: 1
    });
    sidebarClickIn();
  }

  handleClickOfSidebar(e) {
    let sidebarWrapper = document.getElementById('sidebarWrapper');
    if (e.target === sidebarWrapper) {
      // 为了引发 scroll 中 state 的变化，从而使得 scroll refresh
      this.setState({
        scrollRefresh: 0
      });
      sidebarClickOut();
    }
  }

  handleDoubleClick() {
  }

  handleSidebarClick(themesId) {
    this.props.history.push('/theme-index/' + themesId);
  }

  handleEmit(newsItem) {
    this.props.history.push('/news/' + newsItem.id);
  }

  handleListViewWrapperTouchStart(e) {
    this.startY = e.touches[0].pageY;
    this.startX = e.touches[0].pageX;
  }

  handleListViewWrapperTouchMove(e) {
    this.endY = e.touches[0].pageY;
    this.endX = e.touches[0].pageX;
    let sidebar = this.refs.sidebarWrapper.children[0];
    let deltaX = this.endX - this.startX;
    if (this.startX < 10 && deltaX > 0) {
      this.translateInPercent = parseInt((deltaX / window.innerWidth) * 100, 10);
      let backgroundOpacity = 0.3 * (this.translateInPercent / 100);
      if (backgroundOpacity > 0.3) {
        backgroundOpacity = 0.3
      }
      this.refs.sidebarWrapper.style.display = 'block';
      let percent = (-100 + this.translateInPercent);
      if (percent > 0) {
        percent = 0;
      }
      sidebar.style[themeIndex.transform] = `translate3d(${percent}%,0,0)`;
      this.refs.sidebarWrapper.style.background = `rgba(0,0,0,${backgroundOpacity})`

    }
  }

  handleListViewWrapperTouchEnd() {
    let sidebar = this.refs.sidebarWrapper.children[0];
    let sidebarWrapper = this.refs.sidebarWrapper;
    if (this.translateInPercent >= 50) {
      sidebar.style[themeIndex.transform] = 'translate3d(0,0,0)';
      sidebarWrapper.style.background = 'rgba(0,0,0,0.3)';
    } else if (this.translateInPercent < 50) {
      sidebar.style[themeIndex.transform] = 'translate3d(-100%,0,0)';
      sidebarWrapper.style.background = 'transparent';
      if (this.listViewWrapperTimer) {
        clearTimeout(this.listViewWrapperTimer);
      }
      this.listViewWrapperTimer = setTimeout(() => {
        sidebarWrapper.style.display = 'none';
      }, themeIndex.animationDelay);
    }
  }

  handleSidebarTouchStart(e) {
    this.xStart = e.touches[0].pageX;
    this.YStart = e.touches[0].pageY;
  }

  handleSidebarTouchMove(e) {
    // 注意最开始使用 e.target 造成了BUG，原因是 e.target 是触摸的元素，而不是我想要操作的外层 wrapper
    this.xEnd = e.touches[0].pageX;
    this.YEnd = e.touches[0].pageY;
    if (Math.abs(this.YEnd - this.YStart) < 100) {
      let xDelta = this.xEnd - this.xStart;
      let sidebar = this.refs.sidebarWrapper.children[0];
      if (xDelta < 0) {
        this.translateOutPercent = parseInt(((-xDelta) / sidebar.clientWidth) * 100, 10);
        let backgroundOpacity = 0.3 * (1 - (this.translateOutPercent / 100));
        if (backgroundOpacity < 0) {
          backgroundOpacity = 0;
        }
        if (this.translateOutPercent > 100) {
          this.translateOutPercent = 100;
        }
        sidebar.style[themeIndex.transform] = `translate3d(-${this.translateOutPercent}%,0,0)`;
        this.refs.sidebarWrapper.style.background = `rgba(0,0,0,${backgroundOpacity})`
      }
    }
  }

  handleSidebarTouchEnd() {
    let sidebar = this.refs.sidebarWrapper.children[0];
    let sidebarWrapper = this.refs.sidebarWrapper;
    if (this.translateOutPercent >= 50) {
      sidebar.style[themeIndex.transform] = 'translate3d(-100%,0,0)';
      sidebarWrapper.style.background = 'transparent';
      if (this.sidebarScrollTimer) {
        clearTimeout(this.sidebarScrollTimer);
      }
      this.sidebarScrollTimer = setTimeout(() => {
        sidebarWrapper.style.display = 'none';
      }, themeIndex.animationDelay);
    } else if (this.translateOutPercent < 50) {
      sidebar.style[themeIndex.transform] = 'translate3d(0,0,0)';
      sidebarWrapper.style.background = 'rgba(0,0,0,0.3)';
    }
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
        <div className="sidebar-wrapper"
             id="sidebarWrapper"
             ref="sidebarWrapper"
             onTouchStart={(e) => {
               this.handleSidebarTouchStart(e);
             }}
             onTouchMove={(e) => {
               this.handleSidebarTouchMove(e);
             }}
             onTouchEnd={() => {
               this.handleSidebarTouchEnd();
             }}
             onClick={(e) => {
               this.handleClickOfSidebar(e);
             }}>
          <Sidebar themeData={this.state.themeData} emitClick={this.handleSidebarClick.bind(this)} />
        </div>
      </div>
    );
  }
}

export default themeIndex;