import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './m-header.styl';

class MHeader extends Component {
  constructor(props) {
    super(props);
    this.emitClick = this.emitClick.bind(this);
    this.emitDoubleClick = this.emitDoubleClick.bind(this);
  }

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
    const { title, icon } = this.props;

    return (
        <div className="header" onDoubleClick={ this.emitDoubleClick }>
        <span className="left-content">
          <i className="iconfont icon-nav" onClick={ this.emitClick } />
          <em>{ title }</em>
        </span>
          <i className={ "iconfont " + icon } />
        </div>
    );
  }
}

export default MHeader;