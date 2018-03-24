import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './m-header.styl';

class MHeader extends Component {
  static defaultProps = {
    title: '首页'
  };

  static propTypes = {
    title: PropTypes.string
  };

  render() {
    return (
      <div className="header">
        <span className="left-content">
          <i className="icon-nav" />
          <em>{this.props.title}</em>
        </span>
        <i className="icon-setting" />
      </div>
    );
  }
}

export default MHeader;