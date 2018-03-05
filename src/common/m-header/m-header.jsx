import React, {Component} from 'react';
import './m-header.styl';
import PropTypes from 'prop-types';

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
          <i className="icon-nav"/>
          <em>{this.props.title}</em>
        </span>
        <span className="right-content">
          <i className="icon-notice"/>
          <i className="icon-setting"/>
        </span>
      </div>
    );
  }
}

export default MHeader;