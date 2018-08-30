import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Scroll from 'common/scroll/scroll'
import './sidebar.styl'

class Sidebar extends Component {

  static defaultProps = {
    themeData: [],
    // 修改 scroll props 重新刷新 scroll
    scrollRefresh: 0
  }

  static propTypes = {
    themeData: PropTypes.array.isRequired
  }

  getNameList(themeData) {
    if (themeData) {
      let nameList
      return themeData.map((item, index) => {
        nameList = (
          <li key={item.id + '-' + index}>
            <NavLink to={'/theme-index/' + item.id}>
              <em>{item.name}</em>
            </NavLink>
            <i className="iconfont icon-add" />
          </li>
        )
        return nameList
      })
    }
  }

  render() {
    const { scrollRefresh, themeData } = this.props
    const avatar = require('./avatar.jpg')

    return (
      <div className="sidebar" id="sidebar">
        <div className="side-header">
          <img className="avatar" src={avatar} alt="头像" />
          <em className="user-name">未登录</em>
        </div>
        <div className="side-nav">
          <span className="left-content">
            <i className="iconfont icon-favorite" />
            <em>我的收藏</em>
          </span>
          <span className="right-content">
            <i className="iconfont icon-download" />
            <em>离线下载</em>
          </span>
        </div>
        <div className="side-home">
          <Link to="/index">
            <i className="iconfont icon-home" />
            <em>首页</em>
          </Link>
        </div>
        <Scroll
          className="side-scroll"
          id="sideScroll"
          refreshFlag={scrollRefresh}>
          <ul className="theme-wrapper">
            {this.getNameList(themeData)}
          </ul>
        </Scroll>
      </div>
    )
  }
}

export default Sidebar