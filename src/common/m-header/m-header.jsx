import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './m-header.styl';

class MHeader extends Component {
  static defaultProps = {
    title: '首页',
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
          <i className="icon-nav" onClick={() => {
            this.emitClick();
          }} />
          <em>{this.props.title}</em>
        </span>
        <i className="icon-setting" />
      </div>
    );
  }
}

export default MHeader;