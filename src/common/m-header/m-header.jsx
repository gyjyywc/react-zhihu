import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './m-header.styl';

class MHeader extends Component {
  static defaultProps = {
    title: '首页',
    icon: '',
  };

  static propTypes = {
    title: PropTypes.string
  };

  emitClick() {
    this.props.emitClick();
  }

  emitDoubleClick() {
    this.props.emitDoubleClick();
  }

  render() {
    return (
      <div className="header" onDoubleClick={() => {
        this.emitDoubleClick();
      }}>
        <span className="left-content">
          <i className="iconfont icon-nav" onClick={() => {
            this.emitClick();
          }} />
          <em>{this.props.title}</em>
        </span>
        <i className={"iconfont " + this.props.icon} />
      </div>
    );
  }
}

export default MHeader;