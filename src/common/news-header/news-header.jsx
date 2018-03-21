import React, {Component} from 'react';
import './news-header.styl';

class NewsHeader extends Component {

  back() {
    this.props.handleClick();
  }

  render() {
    return (
      <div className="header">
        <i className="icon-next" onClick={() => this.back()} />
        <i className="icon-share" />
        <i className="icon-favorite" />
        <span className="comment">
          <i className="icon-comment" />
          <em>20</em>
        </span>
        <span className="like">
          <i className="icon-like" />
          <em>30</em>
        </span>
      </div>
    );
  }
}

export default NewsHeader;