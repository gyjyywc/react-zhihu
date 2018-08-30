import React, { Component } from 'react'
import './news-header.styl'

class NewsHeader extends Component {
  constructor(props) {
    super(props)
    this.back = this.back.bind(this)
  }

  back() {
    this.props.handleClick()
  }

  render() {
    return (
      <div className="header">
        <i className="iconfont icon-next" onClick={this.back} />
        <i className="iconfont icon-share" />
        <i className="iconfont icon-favorite" />
        <span className="comment">
          <i className="iconfont icon-comment" />
          <em>20</em>
        </span>
        <span className="like">
          <i className="iconfont icon-like" />
          <em>30</em>
        </span>
      </div>
    )
  }
}

export default NewsHeader