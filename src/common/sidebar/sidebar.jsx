import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Scroll from 'common/scroll/scroll';
import './sidebar.styl'

class Sidebar extends Component {

  static defaultProps = {
    themeData: [],
    // 修改 scroll props 重新刷新 scroll
    scrollRefresh: 0,
  };

  static propTypes = {
    themeData: PropTypes.array.isRequired
  };

  render() {
    let nameLists;
    if (this.props.themeData) {
      let nameList;
      nameLists = this.props.themeData.map((item, index) => {
        nameList = (
          <li key={item.id + '-' + index}>
            <em>{item.name}</em>
            <i className="icon-add" />
          </li>
        );
        return nameList;
      });
    }

    return (
      <div className="sidebar" id="sidebar">
        <div className="side-header">
          <img className="avatar" src={require('./avatar.jpg')} alt="头像" />
          <em className="user-name">未登录</em>
        </div>
        <div className="side-nav">
          <span className="left-content">
            <i className="icon-favorite" />
            <em>我的收藏</em>
          </span>
          <span className="right-content">
            <i className="icon-download" />
            <em>离线下载</em>
          </span>
        </div>
        <div className="side-home">
          <i className="icon-home" />
          <em>首页</em>
        </div>
        <Scroll className="side-scroll" id="sideScroll" refreshFlag={this.props.scrollRefresh}>
          <ul className="theme-wrapper">
            {nameLists}
          </ul>
        </Scroll>
      </div>
    );
  }
}

export default Sidebar;