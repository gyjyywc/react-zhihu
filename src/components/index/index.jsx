import MHeader from 'common/m-header/m-header';
import Banner from 'common/banner/banner';
import ListView from 'common/list-view/list-view';
import Scroll from 'common/scroll/scroll';
import Loading from 'common/loading/loading'
import Sidebar from 'common/sidebar/sidebar'
import React, {Component} from 'react';
import {getLatest, getPreviousNews, getThemes} from 'api/index';
import {prefixStyle} from "assets/js/dom";
import './index.styl'

class Index extends Component {
  state = {
    newsId: 0,
    nowDate: 0,
    themeData: [],
    headerTitle: '首页',
    scrollRefresh: 0,
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
      scrollToEnd: {},
      scroll: {}
    }
  };

  static transform = prefixStyle('transform');
  static listenScrollRealTime = 3;
  static animationDelay = 300;
  static scrollDistance = 60;
  static scrollAnimationDuration = 700;

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
        scroll: this.scroll.bind(this)
      }
    });
  }

  componentDidMount() {
    let scrollWrapper = document.getElementById('scrollWrapper');
    scrollWrapper.addEventListener('touchstart', (e) => {
      this.startY = e.touches[0].pageY;
      this.startX = e.touches[0].pageX;
    }, false);

    scrollWrapper.addEventListener('touchmove', (e) => {
      this.endY = e.touches[0].pageY;
      this.endX = e.touches[0].pageX;
      let deltaX = this.endX - this.startX;
      if (this.startX < 7 && deltaX > (window.innerWidth / 3)) {
        console.log('向右滑动了')
      }
    }, false);

    // 侧边栏滑动监听事件
    let sidebarWrapper = document.getElementById('scrollWrapper');
    sidebarWrapper.addEventListener('touchstart', (e) => {
      this.xStart = e.touches[0].pageX;
    }, false);
    sidebarWrapper.addEventListener('touchmove', (e) => {
      this.xEnd = e.touches[0].pageX;
      let deltaX = this.xEnd - this.xStart;
      if (-deltaX > (window.innerWidth / 3)) {
        console.log('向左滑动了')
      }
    }, false);
  }

  handleEmit(newsItem) {
    this.props.history.push('/news/' + newsItem.id);
  }

  handleDoubleClick() {
    let targetEle = document.getElementById('scrollWrapper');
    // 通过 refs 取得 scroll 组件，从而得以调用 scroll 组件的 scrollToElement 方法
    this.refs.scrollWrapper.scrollToElement(targetEle, Index.scrollAnimationDuration)
  }

  handleClickOfSidebar() {
    this.fadeOutAnimation();
  }

  handleClickOfMHeader() {
    this.fadeInAnimation();
  }

  fadeInAnimation() {
    // 为了引发 scroll 中 state 的变化，从而使得 scroll refresh
    this.setState({
      scrollRefresh: 1
    });
    let sidebarWrapper = document.getElementById('sidebarWrapper');
    sidebarWrapper.style.display = `block`;
    // 保证动画效果
    setTimeout(() => {
      sidebarWrapper.style.background = `rgba(0,0,0,0.3)`;
      // sidebar主体
      let sidebar = sidebarWrapper.children[0];
      sidebar.style[Index.transform] = `translate3d(0,0,0)`;
    }, Index.animationDelay / 10);
  }

  fadeOutAnimation() {
    // 为了引发 scroll 中 state 的变化，从而使得 scroll refresh
    this.setState({
      scrollRefresh: 0
    });
    let sidebarWrapper = document.getElementById('sidebarWrapper');
    sidebarWrapper.style.background = `transparent`;
    // sidebar主体
    let sidebar = sidebarWrapper.children[0];
    sidebar.style[Index.transform] = `translate3d(-100%,0,0)`;
    // 保证动画效果，延迟时间与动画时一致
    setTimeout(() => {
      sidebarWrapper.style.display = `none`;
    }, Index.animationDelay);
  }

  scrollToEnd() {
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
              handleClick: this.handleEmit.bind(this),
            }
          });
        }
      })
      .catch((error) => {
        console.error('内部错误，错误原因: ' + error);
      });
  }

  scroll(position) {
    if (position.y > -50 && this.state.headerTitle !== '首页') {
      this.setState({
        headerTitle: '首页'
      });
    } else {
      let dates = document.getElementsByClassName('list-date');
      for (let i = 0; i < dates.length; i++) {
        if (this.startY > this.endY && this.state.headerTitle !== dates[i].textContent) {
          let rec = dates[i].getBoundingClientRect();
          // 加个大于是为了性能优化，在手机上快速滚动卡的要命(大量 state变化导致重新 render)
          if (rec.top < Index.scrollDistance && rec.top > (-window.innerHeight + 50)) {
            this.setState({
              headerTitle: dates[i].textContent
            });
          }
        } else if (i !== 0 && this.startY < this.endY && this.state.headerTitle !== dates[i - 1].textContent) {
          let top = dates[i].getBoundingClientRect().top;
          // 小于是为了限制最后一个 list-item 一直满足条件而使得满足条件的当前 list-item 不能崭露头角
          if (top < (window.innerHeight - 50) && top > Index.scrollDistance) {
            this.setState({
              headerTitle: dates[i - 1].textContent
            });
          }
        }
      }
    }
  }

  render() {
    return (
      <div>
        <MHeader title={this.state.headerTitle}
                 emitClick={this.handleClickOfMHeader.bind(this)}
                 emitDoubleClick={this.handleDoubleClick.bind(this)} />
        <Scroll className="scroll-wrapper"
                id="scrollWrapper"
                ref="scrollWrapper"
                probeType={Index.listenScrollRealTime}
                scrollEvent={this.state.scrollEvent}>
          <div className="slider-wrapper" id="sliderWrapper">
            <div className="slider-content">
              <Banner bannerData={this.state.bannerData} />
            </div>
          </div>
          <ListView listViewData={this.state.listViewData} />
          <div className="list-loading" id="listLoading">
            <Loading title="" />
          </div>
        </Scroll>
        <div className="loading-wrapper" id="loadingWrapper">
          <Loading />
        </div>
        <div className="sidebar-wrapper"
             id="sidebarWrapper"
             onClick={() => {
               this.handleClickOfSidebar()
             }}>
          <Sidebar themeData={this.state.themeData} />
        </div>
      </div>
    );
  }
}

export default Index;